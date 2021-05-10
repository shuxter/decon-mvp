	/*
	Pendientes
	Hay que terminar el flujo de seguro para el pago y inspección
	Hay que replicar el proceso para prestamos

	Hay que armar el menu como seri ala nuestra mas o menos.
	Donde vamos incorpoar graficos?
	Hay que limpirar/esconde rlas adicionales que no sirve.
	*/

	//objetos
	/*
	Neceisto Objeto Vehiculo
	Necesito Objeto Persona

	Quiero poder crear nuevos vehiculos, modificar datos del vehiculo y consultar datos con un Dominio.
	Quiero crear personas, modificar datos de la personas y consultar datos con un DNI.
	*/
	//jquery
	/*
	Agregar event listener a domino,que trae los dtos del objeto y completa los otros campos. Guarda los datos si cambian los campos.

	Agregar evetn listener a DNI que trae los datos del objeto persona y completa los otros campos.

	Guarda los datos de mail y telefono y si realiza alguna modificacion a los datos personales.

	*/
	let $doc = $("body");
	var mail = "";
	var telefono = "";
	let vehiculoACotizar;
	let personaACotizar;
	let patente = "";
	let dni = "";

	//Evetn listener to load Publicar Screen
	$('#opcionPublicar').on('click',function(){
		$('#options').attr('hidden','hidden');
		$('#cargarVehiculos').removeAttr('hidden');
	})
	//event listener for Atributos opcionales
	$('#btnAtributosAdicionales').on('click',function(){
		$('#atributosAdicionales').removeAttr('hidden');
		$('#atributosAdicionales').focus();
	})
	//event listener for portales
	$('#btnPublicar').on('click',function(){
		$('#admPortales').removeAttr('hidden');
		$('#cargarVehiculos').attr('hidden','hidden');
		$('#atributosAdicionales').attr('hidden','hidden');
	})
	//Event listener to return to vehicle page
	$('#btnTerminar').on('click',function(){
		$('#admPortales').attr('hidden','hidden');
	})
	//Event listener to scan car and load with picture
	$('#fotoAuto').on('click',function(){
		$("#dominio").val('AC897ED');
		patente = 'AC897ED';
		console.log(patente);
			vehiculoACotizar = findVehiculo(patente);
			patente = $("#dominio").val().toUpperCase();
			//let x = vehiculos.indexOf(dominio);
			console.log(vehiculoACotizar);
			$("#dominio").removeClass("border-danger");
			$("#dominio").addClass("border-success");
			$("#marca").val(vehiculos[vehiculoACotizar].marca);
			$("#modelo").val(vehiculos[vehiculoACotizar].modelo);
			$("#version").val(vehiculos[vehiculoACotizar].version);
			$("#year").val(vehiculos[vehiculoACotizar].anio);
			$('#selectColor').val(vehiculos[vehiculoACotizar].color);
			console.log(vehiculos[vehiculoACotizar].color);
			$('#Puertas').val(vehiculos[vehiculoACotizar].puertas);

			//Enable the fields for editing
			$("#marca").removeAttr("disabled");
			$("#modelo").removeAttr("disabled");
			$("#version").removeAttr("disabled");
			$("#year").removeAttr("disabled");
	})
	//Event listener to scan DNI and load with picture
	$('#fotoDNI').on('click',function(){
		$("#dni").val('27215446');
		dni = '27215446';
			personaACotizar = findPersonas(dni);
			console.log(personaACotizar);
			$("#dni").removeClass("border-danger");
			$("#dni").addClass("border-success");
			$("#nombre").val(
				personas[personaACotizar].nombre +
					" " +
					personas[personaACotizar].apellido
			);
			$("#dob").val(personas[personaACotizar].bday);
			//		$('sexo').val(personas[personaACotizar].sexo);
			$("#domicilio").val(personas[personaACotizar].domicilio);
			$("#localidad").val(personas[personaACotizar].localidad);
			$("#provincia").val(personas[personaACotizar].provincia);
			$("#cp").val(personas[personaACotizar].cp);
			$("#estadoCivil").val(personas[personaACotizar].estadoCivil);
			personas[personaACotizar]["telefono"] = telefono;
			personas[personaACotizar]["mail"] = mail;
			//Enable the fields for editing
			$("#nombre").removeAttr("disabled");
			$("#dob").removeAttr("disabled");
			$("#domicilio").removeAttr("disabled");
			$("#localidad").removeAttr("disabled");
			$("#provincia").removeAttr("disabled");
			$("#cp").removeAttr("disabled");
			$("#estadoCivil").removeAttr("disabled");
	})
	//Event listener de Dominio para buscar el auto que corresponde

	$("#dominio").on("keyup", function (e) {
		var key = e.which;
		patente = $("#dominio").val().toUpperCase();;
		console.log(patente);
		if (key === 13) {
			vehiculoACotizar = findVehiculo(patente);
			patente = $("#dominio").val().toUpperCase();
			//let x = vehiculos.indexOf(dominio);
			console.log(vehiculoACotizar);
			$("#dominio").removeClass("border-danger");
			$("#dominio").addClass("border-success");
			$("#marca").val(vehiculos[vehiculoACotizar].marca);
			$("#modelo").val(vehiculos[vehiculoACotizar].modelo);
			$("#version").val(vehiculos[vehiculoACotizar].version);
			$("#year").val(vehiculos[vehiculoACotizar].anio);
			$('#selectColor').val(vehiculos[vehiculoACotizar].color);
			console.log(vehiculos[vehiculoACotizar].color);
			$('#Puertas').val(vehiculos[vehiculoACotizar].puertas);
			//Enable the fields for editing
			$("#marca").removeAttr("disabled");
			$("#modelo").removeAttr("disabled");
			$("#version").removeAttr("disabled");
			$("#year").removeAttr("disabled");
			
		} else if (key == 8 || key == 46) {
			$("#dominio").removeClass("border-success");
			$("#dominio").addClass("border-danger");
			$("#marca").val("");
			$("#modelo").val("");
			$("#version").val("");
			$("#year").val("");

			//Enable the fields for editing
			$("#marca").attr("disabled", "disabled");
			$("#modelo").attr("disabled", "disabled");
			$("#version").attr("disabled", "disabled");
			$("#year").attr("disabled", "disabled");
		}
	});
	$(".confGNC").on("change", function () {
		vehiculos[vehiculoACotizar].gnc = $(this).is(":checked");
	});
	//Eventlistener para esconder los datos del vehiculo y traer el container de la persona
	$("#seguro1").on("click", function () {
		mail = $("#mail").val();
		telefono = $("#tel").val();
		$("#cargarVehiculos").attr("hidden", "hidden");
		$("#cargarPersonas").removeAttr("hidden");
	});
	//event listener para guardar el mail
	$(".confDatos").on("change", function () {
		//	personas[personaACotizar]['telefono']=$('#tel').val();
		//	personas[personaACotizar]['mail']=$('#mail').val();
		$("#cotizarSeguros").removeAttr("hidden");
	});
	//event listener de DNI para buscar la persona que corresponde
	$("#dni").on("keyup", function (e) {
		var key = e.which;
		dni = $("#dni").val();
		if (key === 13) {
			personaACotizar = findPersonas(dni);
			console.log(personaACotizar);
			$("#dni").removeClass("border-danger");
			$("#dni").addClass("border-success");
			$("#nombre").val(
				personas[personaACotizar].nombre +
					" " +
					personas[personaACotizar].apellido
			);
			$("#dob").val(personas[personaACotizar].bday);
			//		$('sexo').val(personas[personaACotizar].sexo);
			$("#domicilio").val(personas[personaACotizar].domicilio);
			$("#localidad").val(personas[personaACotizar].localidad);
			$("#provincia").val(personas[personaACotizar].provincia);
			$("#cp").val(personas[personaACotizar].cp);
			$("#estadoCivil").val(personas[personaACotizar].estadoCivil);
			personas[personaACotizar]["telefono"] = telefono;
			personas[personaACotizar]["mail"] = mail;
			//Enable the fields for editing
			$("#nombre").removeAttr("disabled");
			$("#dob").removeAttr("disabled");
			$("#domicilio").removeAttr("disabled");
			$("#localidad").removeAttr("disabled");
			$("#provincia").removeAttr("disabled");
			$("#cp").removeAttr("disabled");
			$("#estadoCivil").removeAttr("disabled");
		}else if (key == 8 || key == 46) {		
			$("#dni").removeClass("border-success");
			$("#dni").addClass("border-danger");
			$("#nombre").attr("disabled", "disabled");
			$("#dob").attr("disabled", "disabled");
			$("#domicilio").attr("disabled", "disabled");
			$("#localidad").attr("disabled", "disabled");
			$("#provincia").attr("disabled", "disabled");
			$("#cp").attr("disabled", "disabled");
			$("#estadoCivil").attr("disabled",'disabled');
		}
	});
	//Paso de Cargar datos de la persona a Cotizaciones
	$("#cotizarSeguros").on("click", function () {
		$('#cargarPersonas').attr('hidden','hidden');
		$('#seguroCotizaciones').removeAttr('hidden');
	});
	//Pasar de las cotizaciones a confirmar los datos
	$('.contratar').on('click',function(){
		$('#seguroCotizaciones').attr('hidden','hidden');
		$('#confirmarDatos').removeAttr('hidden');
		$("#inputDominio").val(vehiculos[vehiculoACotizar].dominio);
		$("#inputMarca").val(vehiculos[vehiculoACotizar].marca);
		$("#inputModelo").val(vehiculos[vehiculoACotizar].modelo);
		$("#inputVersion").val(vehiculos[vehiculoACotizar].version);
		$("#inputYear").val(vehiculos[vehiculoACotizar].anio);
		$("#inputMotor").val(vehiculos[vehiculoACotizar].motor);
		$("#inputChasis").val(vehiculos[vehiculoACotizar].chasis);
		$('#inputValor').val("$"+vehiculos[vehiculoACotizar].precio);

		//persona
		$("#inputDNI").val(personas[personaACotizar].dni);
		$("#inputNombre").val(
			personas[personaACotizar].nombre + " " + personas[personaACotizar].apellido
		);
		$("#inputDOB").val(personas[personaACotizar].bday);
		$("#inputSexo").val(personas[personaACotizar].sexo);
		$("#inputDomicilio").val(personas[personaACotizar].domicilio);
		$("#inputLocalidad").val(personas[personaACotizar].localidad);
		$("#inputProvincia").val(personas[personaACotizar].provincia);
		$("#inputEstado").val(personas[personaACotizar].estadoCivil);
		$("#inputCP").val(personas[personaACotizar].cp);
		console.log(personas[personaACotizar].mail);
		$("#inputMail").val(personas[personaACotizar].mail);
		$("#inputTel").val(personas[personaACotizar].telefono);

		$("#btnConfirmDatos").removeAttr("hidden");
		$("#confirmForm").removeAttr("hidden");
		$("#cargarDatos").attr("hidden", "hidden");
	});

	//Para pasar de confirmar los datos a Pagar
	$('#btnConfirmDatos').on('click',function(){
		$('#confirmarDatos').attr('hidden','hidden');
		$('#seguros5Pago').removeAttr('hidden');
	})
	$('#buttonTC').on('click',function(){
		$('#formTC').removeAttr('hidden');
		$('#formCBU').attr('hidden','hidden');	
	})
	$('#buttonCBU').on('click',function(){
		$('#formCBU').removeAttr('hidden');
		$('#formTC').attr('hidden','hidden');	
	})
	$('#aceptarTCs').on('click',function(){
		window.location.href="/dist/index.html"; // Put url to redirect
	})

	//Objeto Vehiculo
	let vehiculo = {
		dominio: "",
		marca: "",
		modelo: "",
		version: "",
		anio: "",
		chasis: "",
		motor: "",
		km: "",
		color: "",
		precio: "",
		gnc: false,
		puertas:""
	};

	let persona = {
		dni: "",
		nombre: "",
		apellido: "",
		bday: "",
		sexo: "",
		domicilio: "",
		localidad: "",
		provincia: "",
		cp: "",
		estadoCivil: "",
		mail: "",
		telefono: "",
	};

	let vehiculos = [
		{
			dominio: "MBD064",
			marca: "FIAT",
			modelo: "500",
			version: "1.4 SPORT MEX",
			anio: "2013",
			chasis: "3C3CFFBR9DT342781",
			motor: "R*DT342781",
			km: "43.500",
			color: "Verde",
			precio: "750.000",
			gnc: false,
			puertas:3
		},
		{
			dominio: "AA158FZ",
			marca: "BMW",
			modelo: "120I",
			version: "120I ACTIVE 5 PUERTAS",
			anio: "2016",
			chasis: "WBA1U7109G5D33892",
			motor: "A147K210N13B1GA",
			km: "22.360",
			color: "Blanco",
			precio: "4.800.000",
			gnc: false,
			puertas:5
		},
		{
			dominio: "AC897ED",
			marca: "KIA",
			modelo: "120I",
			version: "CARNIVAL EX 2.2 AT CRDI",
			anio: "2018",
			chasis: "KNHMF37ABJ6374332",
			motor: "D4HBHH812159",
			km: "37.360",
			color: "Gris",
			precio: "3.800.000",
			gnc: false,
			puertas:5
		}
	];
	let personas = [
		{
			dni: "94595979",
			nombre: "SIMON",
			apellido: "HUXTER",
			bday: "1988-11-22",
			sexo: "M",
			domicilio: "MUÑECAS 734",
			localidad: "S.M. TUCUMAN",
			provincia: "TUCUMAN",
			cp: "4000",
			estadoCivil: "CASADO",
			mail: "",
			telefono: "",
		},
		{
			dni: "34603202",
			nombre: "MILENA",
			apellido: "RADOVICH",
			bday: "1990-09-11",
			sexo: "F",
			domicilio: "SAN MARTIN 1155",
			localidad: "RETIRO",
			provincia: "CABA",
			cp: "1004",
			estadoCivil: "CASADA",
			mail: "",
			telefono: "",
		},
		{
			dni: "27215446",
			nombre: "MARCELO ROBERTO",
			apellido: "QUEIZAN",
			bday: "1979-03-02",
			sexo: "M",
			domicilio: "Av. Maipu 2465",
			localidad: "OLIVOS",
			provincia: "BUENOS AIRES",
			cp: "1636",
			estadoCivil: "CASADO",
			mail: "",
			telefono: "",
		}
	];

	//functions
	/*
	basicas
	Vehiculo: Crear, modificar, consultar
	Personas: Crear, modificar, consultar
	*/
	function findVehiculo(dominio) {
		let vehicle;
		for (let i = 0; i < vehiculos.length; i++) {
			if (dominio === vehiculos[i]["dominio"]) {
				vehicle = i;
			}
		}
		return vehicle;
	}

	function findPersonas(dni) {
		let persona;
		for (let i = 0; i < personas.length; i++) {
			if (dni === personas[i]["dni"]) {
				persona = i;
			}
		}
		return persona;
	}
