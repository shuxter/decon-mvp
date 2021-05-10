	/*
	Pendientes
	Terminar el flujo de prestamo --> no cotiza sino tiene que ir directo a la pantalla de confirmar datos
	Cambiar icono de slider par aun Auto o Simbolo de plata
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
	let mail = "";
	let telefono = "";
	let vehiculoACotizar;
	let personaACotizar;
	let patente = "";
	let dni = "";
	const $valueSpan = $('#montoAFinanciar');
	const $value = $('#calculatorslider');
	let maxValue;
	let defaultValue;
	let value = $value.val();
	let cuotaMensual;
	let montoCuotaMensual=$('#cuotaMensual');
	let cuotas=12;
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
			maxValue = vehiculos[vehiculoACotizar].precio*0.7;
			defaultValue = vehiculos[vehiculoACotizar].precio*0.20;
			$value.attr('value',defaultValue);
			$value.attr('max',maxValue);
			value = defaultValue;		
			console.log(value = (new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)));
			$valueSpan.html(value);
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
	/*-----------------------------------------------------------------------------
										SLIDER 
-----------------------------------------------------------------------------
*/

		$value.on('input change', () => {			
			$value.attr('max',maxValue);
			value = $value.val();		
			console.log(value = (new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)));
			$valueSpan.html(value);
			cuotaMensual = $value.val()*(1.51)/cuotas;
		console.log(cuotaMensual);
		montoCuotaMensual.html((new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(cuotaMensual)));
		});
	
	$('.cuotas').on('click',function(e){
		$('.cuotas').removeClass('btn-success');
		$(this).toggleClass('btn-success');
		cuotas = $(this).attr('id');
		console.log(cuotas);
		cuotaMensual = $value.val()*(1.51)/cuotas;
		console.log(cuotaMensual);
		montoCuotaMensual.html((new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(cuotaMensual)));
		calcularCuota($value.val(), cuotas, 0.51)
	})  

	  /*-----------------------------------------------------------------------------
											
	-----------------------------------------------------------------------------
	*/
	//Eventlistener para esconder datos del Vehiculo y visualiZr las cuotas
	$('#prestamo1').on('click',function(){
		
			maxValue = vehiculos[vehiculoACotizar].precio*0.7;
			defaultValue = maxValue*0.25;
			$value.attr('value',defaultValue);
			$value.attr('max',maxValue);
			value = defaultValue;		
			value = (new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value));
			$valueSpan.html(value);
			cuotaMensual = $value.val()*(1.51)/cuotas;
		console.log(cuotaMensual);
		montoCuotaMensual.html((new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(cuotaMensual)));
		$('#cargarVehiculos').attr('hidden','hidden');
		$('#prestamos').removeAttr('hidden');
	});
	//Eventlistener para esconder los datos del vehiculo y traer el container de la persona
	$("#prestamo2").on("click", function () {
		mail = $("#mail").val();
		telefono = $("#tel").val();
		$("#prestamos").attr("hidden", "hidden");
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
		$('#prestamos').removeAttr('hidden');
		$('#prestamo2').attr('hidden','hidden');
		$("#cargarDatos").attr("hidden", "hidden");
	});

	//Para pasar de confirmar los datos a Pagar
	// $('#btnConfirmDatos').on('click',function(){
	// 	$('#confirmarDatos').attr('hidden','hidden');
	// 	//$('#seguros5Pago').removeAttr('hidden');
	// })
	// $('#buttonTC').on('click',function(){
	// 	$('#formTC').removeAttr('hidden');
	// 	$('#formCBU').attr('hidden','hidden');	
	// })
	// $('#buttonCBU').on('click',function(){
	// 	$('#formCBU').removeAttr('hidden');
	// 	$('#formTC').attr('hidden','hidden');	
	// })
	$('#aceptarTCs').on('click',function(){
		$('#confirmarDatos').attr('hidden','hidden');
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
			color: "VERDE",
			precio: "750000",
			gnc: false,
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
			color: "BLANCO",
			precio: "4800000",
			gnc: false,
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
			color: "PLATA",
			precio: "3800000",
			gnc: false,
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

	function calcularCuota(prestamo, cuotas, tna){
	//TEA = [(1+TNA/PERIODO)*PERIODO – 1]
	//TEM = [(1+TEA)*(1/PERIODO) – 1]
	//	Cuota = (Monto del préstamo * (TEM x (1 + TEM)*MESES)) / ((1 + TEM)*MESES) – 1)
	let anios = cuotas/12; 	
	let TEM = tna/12;	
	let pagoMensual = prestamo*((TEM*Math.pow((1 + TEM),cuotas)) / ((Math.pow(1 + TEM),cuotas)-1));
	console.log("termino: "+anios);
	//console.log("TEA: "+TEA);
	console.log('Monto: '+prestamo)
	console.log("TNA: "+ tna);
	console.log("TEM: "+TEM);
	console.log("Cuota: "+pagoMensual);
	return pagoMensual;
	}