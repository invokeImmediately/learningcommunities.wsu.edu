/*!*************************************************************************************************
 * gulpfile.js
 * -------------------------------------------------------------------------------------------------
 * SUMMARY: Gulp automation task definition file for setting up tasks that build CSS and JS files
 * for use on the WSUWP website of the WSU LSAMP program.
 *
 * AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 *
 * REPOSITORY: https://github.com/invokeImmediately/nsse.wsu.edu
 *
 * LICENSE: ISC - Copyright (c) 2019 Daniel C. Rieck.
 *
 *   Permission to use, copy, modify, and/or distribute this software for any purpose with or
 *   without fee is hereby granted, provided that the above copyright notice and this permission
 *   notice appear in all copies.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS" AND DANIEL RIECK DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
 *   SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL
 *   DANIEL RIECK BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
 *   DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF
 *   CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *   PERFORMANCE OF THIS SOFTWARE.
 **************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////
// TABLE OF CONTENTS
// -----------------
// §1: Gulp task dependencies..................................................................40
// §2: Specificiation of build settings .......................................................45
//   §2.1: getCssBuildSettings()...............................................................48
//   §2.2: getJsBuildSettings()................................................................83
// §3: Entry point: Set up of build taks......................................................110
////////////////////////////////////////////////////////////////////////////////////////////////////

( function() {

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Gulp task dependencies

var gulpBuilder = require( './WSU-UE---JS/gulpBuilder.js' );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Specificiation of build settings 

////////
// §2.1: getCssBuildSettings()

/**
 * Get the settings for a gulp-mediated custom CSS build from Less source files.
 *
 * @return {object} - Instance of gulpBuilder.CssBuildSettings.
 */

function getCssBuildSettings() {
	var commentRemovalNeedle = /^(?:[ \t]*)?\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm;
	var dependenciesPath = './WSU-UE---CSS/';
	var destFolder = './CSS/';
	var fontImportStr = '@import url(\'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|\
Roboto+Condensed:400,700|Roboto+Slab|PT+Serif\');\r\n';
	var insertingMediaQuerySectionHeader = {
			'before': /^@media/,
			'lineBefore': '/*! ╔═══════════════════════════════════════════════════════════════════\
════════════════════════════════════════════════════╗\r\n*   ║ MEDIA QUERIES ######################\
################################################################################# ║\r\n*   ╚═══════\
═══════════════════════════════════════════════════════════════════════════════════════════════════\
═════════════╝\r\n*/',
			'stopAfterFirstMatch': true
		};
	var minCssFileExtension = '.min.css';
	var minCssFileHeaderStr = '/*! Built with the Less CSS preprocessor [http://lesscss.org/]. Plea\
se see [https://github.com/invokeImmediately/learningcommunities.wsu.edu] for a repository of sourc\
e code. */\r\n';
	var sourceFile = './CSS/learningcommunities-custom.less';

	return new gulpBuilder.CssBuildSettings(commentRemovalNeedle, dependenciesPath,
		destFolder, fontImportStr, insertingMediaQuerySectionHeader, minCssFileExtension,
		minCssFileHeaderStr, sourceFile);
}

////////
// §2.2: getJsBuildSettings()

/**
 * Get the settings for a gulp-mediated custom JS build.
 *
 * @return {object} - Simple collection of settings for JS builds.
 */
function getJsBuildSettings() {
	return {
		buildDependenciesList: [
			'./WSU-UE---JS/jQuery.oue-custom.js',
			'./WSU-UE---JS/jQuery.cookieObjs.js',
			'../qTip2/dist/jquery.qtip.min.js',
			'./WSU-UE---JS/jQuery.qTip.js',
			'./WSU-UE---JS/jQuery.css-data.js',
			'./WSU-UE---JS/jQuery.textResize.js',
			'./JS/fyf-custom.js'
		],
		commentNeedle: /^(\/\*)(?!!)/g,
		compiledJsFileName: 'fyf-build.js',
		destFolder: './JS/',
		minJsFileExtension: '.min.js',
		replaceCallback: gulpBuilder.fixFileHeaderComments
	};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §3: Entry point: Set up of build taks

gulpBuilder.setUpCssBuildTask( getCssBuildSettings() );
gulpBuilder.setUpJsBuildTask( getJsBuildSettings() );

} )();
