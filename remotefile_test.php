<?php

function get_filename($address) {
  return basename($address);

function get_remote_file() {
  if (($address = sanity_check_address_post()) === false) {
    return false;
  }

  $path = '/files/' . get_filename($address);
  $ch = curl_init($address);

  $fp = fopen($path, 'w');
  
  curl_setopt($ch, CURLOPT_FILE, $fp);
  
  $data = curl_exec($ch);
  curl_close($ch);

  if ($data !== false) {
    file_put_contents($path, $data);
    return json_encode(array('filename' => $path));
  }
}

function sanity_check_address() {
  $url_regex = "/^http[s]?\:\/\/.+\..+/";
  $post_data = $_POST;

  if (empty($post_data)) {
    return false;
  }

  if (!array_key_exists('address', $post_data)) {
    return false;
  }

  if (preg_match($url_regex, $post_data['address']) === false) {
    return false;
  }

  return $post_data['address'];
}
  
