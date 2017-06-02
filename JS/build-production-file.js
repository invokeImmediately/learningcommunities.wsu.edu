/* NODE.JS - Build Production JavaScript File */
var concat = require('../../../../AppData/Roaming/npm/node_modules/concat-files');
concat([
 './fyf-custom.js',
 '../WSU-UE---JS/jQuery.oue-custom.js',
 '../WSU-UE---JS/jQuery.qTip.js',
 '../../imagesloaded/imagesloaded.pkgd.min.js',
 '../../masonry/dist/masonry.pkgd.min.js',
 '../WSU-UE---JS/jQuery.masonry-custom.js',
 ], './wp-custom-js-source.js', function() {
    console.log('Concatenation complete.');     
 });