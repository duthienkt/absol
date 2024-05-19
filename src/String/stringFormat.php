<?php
 function nonAccentVietnamese($s) {
    $s = preg_replace("/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/", "a", $s);
    $s = preg_replace("/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/", "A", $s);
    
    $s = preg_replace("/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/", "e", $s);
    $s = preg_replace("/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/", "E", $s);
    $s = preg_replace("/ì|í|ị|ỉ|ĩ/", "i", $s);
    $s = preg_replace("/Ì|Í|Ị|Ỉ|Ĩ/", "I", $s);
    $s = preg_replace("/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/", "o", $s);
    $s = preg_replace("/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/", "O", $s);
    $s = preg_replace("/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/", "u", $s);
    $s = preg_replace("/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/", "U", $s);
    $s = preg_replace("/ỳ|ý|ỵ|ỷ|ỹ/", "y", $s);
    $s = preg_replace("/Ỳ|Ý|Ỵ|Ỷ|Ỹ/", "Y", $s);
    $s = preg_replace("/đ/", "d", $s);
    $s = preg_replace("/Đ/", "D", $s);
    // $s = preg_replace("/\x{0300}|\x{0301}|\x{0303}|\x{0309}|\x{0323}/", "", $s);
    // $s = preg_replace("/\x{02C6}|\x{0306}|\x{031B}/", "", $s);

    return $s;
}


function normalizeIdent($text, $opt = []) {
    $spaces = '_';
    if (isset($opt['spaces'])) {
        $spaces = $opt['spaces'] ?? '';
    }

    $symbols = '_';
    if (isset($opt['symbols'])) {
        $symbols = $opt['symbols'] ?? '';
    }

    $startsWithDigit = false;
    if (isset($opt['startsWithDigit'])) {
        $startsWithDigit = $opt['startsWithDigit'] ?? false;
    }

    $res = nonAccentVietnamese($text);
    if (is_string($spaces)) {
        $res = preg_replace('/\s+/', $spaces, $res);
    }
    if (is_string($symbols)) {
        if ($spaces === '_') {
            $res = preg_replace('/[^a-zA-Z0-9_$]+/', $symbols, $res);
        } elseif ($spaces === '-') {
            $res = preg_replace('/[^a-zA-Z0-9_$\-]+/', $symbols, $res);
        }
    }

    if (!$startsWithDigit && preg_match('/^[0-9]/', $res)) {
        $res = '$' . $res;
    }
    return $res;
}


?>