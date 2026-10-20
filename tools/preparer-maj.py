"""Prepare an Exodus-style cumulative, manual update; never transfer anything."""
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import subprocess
import argparse
import zipfile

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'serveur_externe'


def version_tuple(value):
    if not re.fullmatch(r'\d+\.\d+\.\d+', value):
        raise ValueError('Version incorrecte : ' + value)
    return tuple(map(int, value.split('.')))


def index_manifest(manifest):
    result = {}
    for item in manifest['files']:
        name = item['file']
        rel = PurePosixPath(name)
        if rel.is_absolute() or '..' in rel.parts or '\\' in name or ':' in name or name in result:
            raise ValueError('Chemin de manifeste incorrect : ' + name)
        if not re.fullmatch(r'[0-9a-f]{64}', item['sha256']) or item['bytes'] < 0:
            raise ValueError('Empreinte incorrecte : ' + name)
        result[name] = item
    return result


def validate_bytes(data, item):
    if len(data) != item['bytes'] or hashlib.sha256(data).hexdigest() != item['sha256']:
        raise ValueError('Fichier différent du manifeste : ' + item['file'])


def safe_write(folder, name, data):
    destination = folder / name
    if not destination.resolve().is_relative_to(folder.resolve()):
        raise ValueError('Destination hors du paquet : ' + name)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(data)


def write_text(folder, name, text):
    safe_write(folder, name, text.encode('utf-8'))


def main():
    parser = argparse.ArgumentParser(description='Préparer une mise à jour locale, sans transfert.')
    parser.add_argument('--complet', action='store_true', help='Inclure tous les fichiers publics, même inchangés.')
    full = parser.parse_args().complet
    cached_node = Path(os.environ.get('USERPROFILE', str(Path.home()))) / '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
    node = str(cached_node) if cached_node.is_file() else shutil.which('node')
    if not node:
        raise RuntimeError('Node.js est nécessaire pour préparer la copie publique.')
    subprocess.run([node, str(ROOT / 'tools/preparer-publication.cjs')], cwd=ROOT, check=True, capture_output=True)
    current = json.loads((PUBLIC / 'publication-manifest.json').read_text(encoding='utf-8'))
    version = current['version']
    current_files = index_manifest(current)
    for name, item in current_files.items():
        validate_bytes((PUBLIC / name).read_bytes(), item)
    previous = []
    for archive in ROOT.glob('stringart3D-*-serveur-externe.zip'):
        match = re.fullmatch(r'stringart3D-(\d+\.\d+\.\d+)-serveur-externe\.zip', archive.name)
        if not match or version_tuple(match[1]) >= version_tuple(version):
            continue
        with zipfile.ZipFile(archive) as package:
            manifest = json.loads(package.read('publication-manifest.json'))
            if manifest['version'] != match[1]:
                raise ValueError('Version incohérente dans ' + archive.name)
            previous.append((match[1], archive, index_manifest(manifest)))
    previous.sort(key=lambda p: version_tuple(p[0]))
    if not previous and not full:
        raise RuntimeError('Aucune archive complète antérieure : préparer une installation complète.')
    # Union of differences also covers a file reverted after an intermediate version.
    changed = list(current_files) if full else [name for name, item in current_files.items()
               if any(old.get(name, {}).get('sha256') != item['sha256'] for _, _, old in previous)]
    removed = sorted(set().union(*(set(old) for _, _, old in previous)) - set(current_files))
    versions = [v for v, _, _ in previous]
    folder = PUBLIC / ('MAJ_' + version)
    if folder.resolve().parent != PUBLIC.resolve() or folder.is_symlink():
        raise ValueError('Dossier MAJ incorrect.')
    folder.mkdir(exist_ok=True)
    expected = set(changed) | {'TRANSFERT.txt', 'manifest-maj.json'}
    extras = [p for p in folder.rglob('*') if p.is_symlink() or p.is_file() and p.relative_to(folder).as_posix() not in expected]
    if extras:
        raise ValueError('Fichiers inattendus dans le dossier MAJ : ' + str(extras[0]))
    for name in changed:
        safe_write(folder, name, (PUBLIC / name).read_bytes())
    manifest = {
        'name': 'stringart3D', 'version': version,
        'previousVersion': versions[-1] if versions else None,
        'baseVersion': versions[0] if versions else version,
        'compatibleVersions': versions, 'mode': 'complete' if full else 'cumulative',
        'files': [current_files[name] for name in changed], 'removedFiles': removed,
        'unchangedFiles': [name for name in current_files if name not in changed]
    }
    notice = (
        f'STRINGART3D — MISE À JOUR {version}\n\n' +
        ('PAQUET COMPLET : tous les fichiers de l’application sont inclus,\n'
         'y compris le moteur, les deux portraits, les traductions et les licences.\n'
         'Aucune mise à jour précédente n’est nécessaire.\n' if full else
         f'Mise à jour cumulée depuis {versions[0]}.\n') +
        ('Installations prises en charge : ' + ', '.join(versions) + '.\n\n' if versions else
         'Installation complète autonome, préparée sans archive antérieure.\n\n') +
        'Cette mise à jour rassemble les dernières corrections de l’atelier :\n'
        'fenêtre Démos avec les portraits de Jacinto et d’Anne,\n'
        'ouverture en mode réglages,\n'
        'barre supérieure compacte et commandes de lecture sous la vue 3D,\n'
        'import STL avec allègement automatique,\n'
        'fil 3D avec renflements colorés réglables, aide et interface en français,\n'
        'anglais, espagnol et catalan avec détection automatique de la langue.\n\n'
        f'Copier le CONTENU de MAJ_{version} dans le dossier du serveur externe\n'
        'où se trouve déjà index.html de stringart3D. Conserver les sous-dossiers\n'
        'et remplacer les fichiers existants par ceux du paquet.\n'
        f'Ne pas envoyer le dossier MAJ_{version} lui-même, TRANSFERT.txt\n'
        'ou manifest-maj.json.\n\n'
        'FICHIERS À COPIER :\n' + '\n'.join(changed) + '\n\n'
        'FICHIERS À SUPPRIMER :\n' + ('\n'.join(removed) if removed else 'Aucun.') + '\n\n'
        'APRÈS TRANSFERT :\n'
        f'Recharger avec Ctrl+F5 et vérifier v{version}\n'
        'dans l’en-tête, à droite de « Studio de portraits tissés ».\n'
        'Vérifier le clic droit glissé, le recentrage et les boutons de vue.\n\n' +
        ('Ce paquet convient aussi à une première installation : copier tous les\n'
         'fichiers ci-dessus, avec les dossiers assets et vendor et .htaccess.\n\n' if full else
         'Pour une première installation, utiliser l’archive complète ou la copie\n'
         'publique, y compris assets et vendor. Ce paquet MAJ nécessite une\n'
         'installation existante.\n\n') +
        'Aucun transfert ni publication automatique effectué.\n'
    )
    write_text(folder, 'TRANSFERT.txt', notice)
    write_text(folder, 'manifest-maj.json', json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    archive = PUBLIC / f'MAJ_{version}.zip'
    if archive.is_symlink():
        raise ValueError('Archive MAJ incorrecte.')
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as package:
        for name in sorted(expected):
            package.write(folder / name, name)
    # Verify the ZIP, its file list and every included payload after writing.
    with zipfile.ZipFile(archive) as package:
        if set(package.namelist()) != expected or package.testzip() is not None:
            raise ValueError('Archive MAJ incomplète.')
        for name in changed:
            validate_bytes(package.read(name), current_files[name])
    # Simulate applying this update over EVERY known prior full release.
    for old_version, old_archive, old in previous:
        with zipfile.ZipFile(old_archive) as package:
            for name, item in current_files.items():
                data = (folder / name).read_bytes() if name in changed else package.read(name)
                validate_bytes(data, item)
    write_text(PUBLIC, 'MISE_A_JOUR_SERVEUR.txt', notice)
    write_text(PUBLIC, 'manifest-courant.json', json.dumps(current, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'version': version, 'compatibleVersions': versions,
                      'folder': str(folder), 'zip': str(archive), 'filesToCopy': changed,
                      'mode': manifest['mode'], 'unchangedFiles': len(current_files) - len(changed),
                      'archiveBytes': archive.stat().st_size, 'verifiedFromEveryVersion': True},
                     ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
