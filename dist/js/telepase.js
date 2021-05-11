/* Flujo dde Telepase
1. Acceder X
2. Elegir si queres adherite gratis o activalo 
3. completar tus datos personales en base a DNI X
4. Autocompletar datos de celular telefono y mail 
5. confirmar mail
6. Datos impostivos ?
7. Datos del vehiculo a partir del patente trae todo.
8. Categoria selecionardo Automvbil por default
9.Boton agregar
10. Medio de pago --> video de la tarjeta
11. Ingrese DNI del titular con un tilde si es la misma
12. Elegir modo de colocacion (En caso de concesionaria seria en la misma)
13. Aceptar terminos y conidcion es
14. Boton Enviar
*/
	let $doc = $("body");
	var mail = "";
	var telefono = "";
	let vehiculoACotizar;
	let personaACotizar;
	let patente = "";
	let dni = "";

	//Event listener to scan car and load with picture
	$('#fotoAuto').on('click',function(){
		$("#dominio").val('AC897ED');
		patente = 'AC897ED';
		console.log("Dominio: ",patente);
			vehiculoACotizar = findVehiculo(patente);
			patente = $("#dominio").val().toUpperCase();
			//let x = vehiculos.indexOf(dominio);
			console.log(vehiculoACotizar);
			$("#dominio").removeClass("border-danger");
			$("#dominio").addClass("border-success");
			$("#marca").val(vehiculos[vehiculoACotizar].marca);
			$("#modelo").val(vehiculos[vehiculoACotizar].modelo);
			$("#color").val(vehiculos[vehiculoACotizar].color);
			$("#year").val(vehiculos[vehiculoACotizar].anio);
			console.log('COLOR:', vehiculos[vehiculoACotizar].color)
			//Enable the fields for editing
			$("#marca").removeAttr("disabled");
			$("#modelo").removeAttr("disabled");
			$("#version").removeAttr("disabled");
			$("#year").removeAttr("disabled");
			$("#color").removeAttr("disabled");
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
			personas[personaACotizar]["telefono"] = telefono;
			personas[personaACotizar]["mail"] = mail;
			//Enable the fields for editing
			$("#nombre").removeAttr("disabled");
			$("#dob").removeAttr("disabled");
			$("#domicilio").removeAttr("disabled");
			$("#localidad").removeAttr("disabled");
			$("#provincia").removeAttr("disabled");
			$("#cp").removeAttr("disabled");
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
			console.log("ID del Vehiculoa Cotizar: ",vehiculoACotizar);
			$("#dominio").removeClass("border-danger");
			$("#dominio").addClass("border-success");
			$("#marca").val(vehiculos[vehiculoACotizar].marca);
			$("#modelo").val(vehiculos[vehiculoACotizar].modelo);
			$("#version").val(vehiculos[vehiculoACotizar].version);
			$("#year").val(vehiculos[vehiculoACotizar].anio);
			$("#color").val(vehiculos[vehiculoACotizar].color);

			//Enable the fields for editing
			$("#marca").removeAttr("disabled");
			$("#modelo").removeAttr("disabled");
			$("#version").removeAttr("disabled");
			$("#year").removeAttr("disabled");
			$("#color").removeAttr("disabled");
		} else if (key == 8 || key == 46) {
			$("#dominio").removeClass("border-success");
			$("#dominio").addClass("border-danger");
			$("#marca").val("");
			$("#modelo").val("");
			$("#color").val("");
			$("#year").val("");

			//Enable the fields for editing
			$("#marca").attr("disabled", "disabled");
			$("#modelo").attr("disabled", "disabled");
			$("#color").attr("disabled", "disabled");
			$("#year").attr("disabled", "disabled");
		}
	});
	//Eventlistener para esconder los datos del vehiculo y traer el container de la persona
	$("#customSwitchesData").on("click", function () {
		mail = $("#mail").val();
		telefono = $("#tel").val();
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
		
		}
	});
$("#addVehicle").on("click", function (e) {
	$("#addVehcile").removeClass("btn-outline-success");
	$("#addVehcile").addClass("btn-success");
})

$('#cargarTCScan').on('click',function(){
	console.log(tarjeta);
		$('#inputCardName').val(tarjeta.nombre);
		$('#inputCardNum').val(tarjeta.numero);
		$('#inputExpMM').val(tarjeta.mm);
		$('#inputExpAA').val(tarjeta.aa);
		$('#inputCardCVC').val(tarjeta.cvc);
	});
	$('#aceptarTCs').on('click',function(){
		window.location.href="/dist/index.html"; // Put url to redirect
	}) 

	//Para pasar de confirmar los datos a Pagar
	/* $('#btnConfirmDatos').on('click',function(){
		$('#confirmarDatos').attr('hidden','hidden');
		$('#seguros5Pago').removeAttr('hidden');
	})
	$('#buttonTC').on('click',function(){
		$('#divScanTC').removeAttr('hidden');
		$('#formTC').removeAttr('hidden');
		$('#formCBU').attr('hidden','hidden');	
	})
	$('#buttonCBU').on('click',function(){
		$('#formCBU').removeAttr('hidden');
		$('#formTC').attr('hidden','hidden');
		$('#divScanTC').attr('hidden','hidden');	
	})
	*/

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
			precio: "750.000",
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
			precio: "4.800.000",
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
			precio: "3.800.000",
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
			mail: "",
			telefono: "",
		}
	];
	let tarjeta={
		nombre:"M R Quiezan",
		numero: "606X XXXX XXXX XXXX",
		mm:02,
		aa:12,
		cvc:111,
	} 
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
