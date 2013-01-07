<?php

function get_filename($address) {
  return basename($address);
}

function check_local_file_exists($filename) {
  return file_exists($filename);
}

function get_remote_file() {
  if (($address = sanity_check_address_post()) === false) {
    return false;
  }

  $path = 'files/' . get_filename($address);
  $ch = curl_init($address);

  if (!check_local_file_exists($path)) {
    file_put_contents($path, 'gibberish to be overwritten');
  }
 
  $fp = fopen($path, 'w+');

  curl_setopt($ch, CURLOPT_FILE, $fp);
  
  $data = curl_exec($ch);
  curl_close($ch);

  if ($data !== false && !empty($data)) {
    fwrite($fp, $data);
    
    return json_encode(array('filename' => $path));
  }
}

function sanity_check_address_post() {
  $url_regex = "/^http[s]?\:\/\/.+(\.)(jpg|gif|png)$/";
  $post_data = $_POST;

  if (empty($post_data)) {
    return false;
  }

  if (!array_key_exists('address', $post_data)) {
    return false;
  }

  $pregs = array();

  preg_match_all($url_regex, $post_data['address'], $pregs);

  if (empty($pregs[0])) {
    return false;
  }

  if (strcmp($pregs[0][0], $post_data['address']) != 0) {
    return false;
  }

  return $post_data['address'];
}

$filestuff = get_remote_file();
if (empty($filestuff)) {
  echo "Nothing found!";
}
else {
  echo $filestuff;
}

