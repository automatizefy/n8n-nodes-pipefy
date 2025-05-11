const { src, dest } = require('gulp');
const { join } = require('path');

/**
 * Copia o ícone SVG de todos os nós para a pasta dist
 */
function buildIcons() {
	return src('./nodes/**/*.svg').pipe(dest('./dist/nodes'));
}

exports.build = buildIcons;
exports['build:icons'] = buildIcons; 