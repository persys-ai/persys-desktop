<?php

use MatthiasMullie\Minify;

$path = getcwd();
require_once($path.'/config/minify/src/Minify.php');
require_once($path.'/config/minify/src/CSS.php');
require_once($path.'/config/minify/src/JS.php');
require_once($path.'/config/minify/src/Exception.php');
require_once($path.'/config/minify/src/Exceptions/BasicException.php');
require_once($path.'/config/minify/src/Exceptions/FileImportException.php');
require_once($path.'/config/minify/src/Exceptions/IOException.php');
require_once($path.'/config/path-converter/src/ConverterInterface.php');
require_once($path.'/config/path-converter/src/Converter.php');


// ************************************ ************************************ ************************************
$jsScripts=[
    '/assets/scripts/lib/sha256.min.js',
    '/assets/scripts/lib/chart.js',
    '/assets/scripts/lib/ace/ace.js',
    '/assets/scripts/lib/ace/theme-dawn.js',
    '/assets/scripts/lib/ace/mode-json.js',
    '/assets/scripts/lib/ace/mode-python.js',
    '/assets/scripts/lib/ace/mode-javascript.js',
    '/assets/scripts/lib/ace/theme-twilight.js',
    '/assets/scripts/lib/peer.js',
    '/assets/scripts/lib/md5.js',
    '/assets/scripts/lib/katex.js',

    '/assets/scripts/utils/consts.js',
    '/assets/scripts/utils/api.js',
    '/assets/scripts/utils/token.js',
    '/assets/scripts/utils/calendar.js',
    '/assets/scripts/utils/elements.js',
    '/assets/scripts/utils/human.js',
    '/assets/scripts/utils/text.js',
    '/assets/scripts/utils/interface.js',

    '/assets/scripts/core/env.js',
    '/assets/scripts/core/login.js',
    '/assets/scripts/core/settings.js',
    '/assets/scripts/core/monitor.js',
    '/assets/scripts/core/home.js',

    '/assets/scripts/core/apps/chat.js',
    '/assets/scripts/core/apps/files.js',
    '/assets/scripts/core/apps/music.js',
    '/assets/scripts/core/apps/gallery.js',
    '/assets/scripts/core/apps/paper.js',
    '/assets/scripts/core/apps/cinema.js',
    '/assets/scripts/core/apps/library.js',
    '/assets/scripts/core/apps/todo.js',
    '/assets/scripts/core/apps/cardclip.js',

    '/assets/scripts/core/helpers/plaintext.js',
    '/assets/scripts/core/helpers/rag.js'
];


$interfaceMinifier=new Minify\JS($path.$jsScripts[0]);
for($i=1;$i<count($jsScripts);$i++) {
    $interfaceMinifier->add($path.$jsScripts[$i]);
}
//
$interfaceMinified=$path.'/src/src/interface.min.js';
$interfaceMinifier->minify($interfaceMinified);
// ************************************ ************************************ ************************************
// ************************************ ************************************ ************************************

$cssStyles=[
    '/assets/styles/init.css',
    '/assets/styles/login.css',
    '/assets/styles/options.css',
    '/assets/styles/menu.css',

    '/assets/styles/general/toggle.css',
    '/assets/styles/general/popups.css',
    '/assets/styles/general/content.css',
    '/assets/styles/general/floater.css',
    '/assets/styles/general/sidebar.css',

    '/assets/styles/home/space.css',
    '/assets/styles/home/home.css',
    '/assets/styles/home/monitor.css',
    '/assets/styles/home/prompt.css',
    '/assets/styles/home/grid.css',
    '/assets/styles/home/settings.css',

    '/assets/styles/apps/files.css',
    '/assets/styles/apps/chat.css',
    '/assets/styles/apps/gallery.css',
    '/assets/styles/apps/cinema.css',
    '/assets/styles/apps/music.css',
    '/assets/styles/apps/paper.css',
    '/assets/styles/apps/library.css',
    '/assets/styles/apps/todo.css',
    '/assets/styles/apps/cardclip.css',

    '/assets/styles/helpers/rag.css',
    '/assets/styles/helpers/plaintext.css'
];


$styleMinifier=new Minify\CSS($path.$cssStyles[0]);
for($i=1;$i<count($cssStyles);$i++) {
    $styleMinifier->add($path.$cssStyles[$i]);
}
//
$styleMinified=$path.'/src/src/style.min.css';
$styleMinifier->minify($styleMinified);
// ************************************ ************************************ ************************************

echo "\n";
echo "compressed \n";
echo "\n";