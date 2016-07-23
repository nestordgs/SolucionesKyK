<?php

$name="";
$email="";
$phone="";
$comment="";
$consulta="";
	
if ($_SERVER["REQUEST_METHOD"] == "POST"){
	$name = strip_tags($_POST['name']);
	$email = filter_var(trim($_POST['email']),FILTER_VALIDATE_EMAIL);
	$phone = trim($_POST['phone']);
	$comment = strip_tags($_POST['comment']);
	$consulta = trim($_POST['consulta']);
	$captcha = $_POST['g-recaptcha-response'];

	if (!$captcha) {
		http_response_code(400);
		$response['failure'] = "Debe Seleccionar el Captcha de verificacion";
		exit(json_encode($response));
		break;
	}else{
		$secret = "6LduWCQTAAAAAIHAwHizCr_BgrRPvBW2gotPUNEp";
		$respuesta['captcha'] = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha."&remoteip=".$_SERVER["REMOTE_ADDR"]), true);
	}
	if (empty($name) || empty($email) || empty($phone) || empty($consulta) || empty($comment) || $respuesta['captcha']['success']!= true){
		http_response_code(400);
		$response['failure'] = "Parece que faltan datos para el envio de su comentario";
		exit(json_encode($response));
		break;

    }else{
    	$subject="Gracias por Contactarnos";

    	switch ($consulta) {
    		case '1':
    			$consult='Administración de Empresas';
    			break;
    		case '2':
    			$consult='Diseño Web';
    			break;
    		case '3':
    			$consult='Publicidad & Mercadeo';
    			break;
    		case '4':
    			$consult='Seguridad Industrial';
    			break;
    		default:
    			$consult='';
    			break;
    	}
		
		$rutaFoto = 'http://www.solucioneskyk.com/NestorKsb/img/firma.png';
		$message='<html>
					<head>
						<title>Gracias por Contactarnos</title>
					</head>
					<body>
						<p>Hola '.$name.',</p>

						<p>
							Gusto en saludarle, gracias por contactarnos a través de nuestra pagina WEB, en breves instantes nuestro grupo de expertos especializados en el área "'.$consult.'" estarán atendiendo su solicitud, en relación a "'.$comment.'".
						</p>
						<p>
					La cual responderemos al siguiente correo eléctronico '.$email.' o en su defecto lo contactaremos al número de telefono '.$phone.'.
						</p>
						<p>
							Muchas gracias de antemano por preferirnos. En <b>Soluciones K&K</b> nos distinguimos por nuestro vocación de servicio
						</p>
						<br>
						<p>
							Saludos Cordiales<br>
							<img src='.$rutaFoto.'><br>
							www.solucioneskyk.com<br>
							Teléfono: 0212-341-9717 | 0412-2702356 | 0412-2555958
						</p>
					</body>
				</html>';
    	
    	$cabeceras = 'From: Soluciones K&K <no-responder@solucioneskyk.com>'."\r\n";
    	$cabeceras.= 'Bcc: contacto@solucioneskyk.com' . "\r\n";
    	$cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

    	if (mail($email, $subject, $message,$cabeceras,'-fcontacto@solucioneskyk.com')) {
    		http_response_code(200);
    		$response['success'] = "success message";
    		exit(json_encode($response));
    		break;
    	}else{
    		http_response_code(400);
    		$response['failure'] = "Algo ha ocurrido durante el envio de su comentario";
    		exit(json_encode($response));
    		break;
    	}
    }
}else{
	http_response_code(403);
	$response['failure'] = "Algo no funciono muy bien, intentalo nuevamente";
	exit(json_encode($response));
	break;
}