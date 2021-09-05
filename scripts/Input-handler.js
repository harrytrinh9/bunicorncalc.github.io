$('#txtTrainerLevel').on('input', function(){
    var inputData = $('#txtTrainerLevel').val();
    if (isNaN(inputData)){
        MsgBox('Only input the number to this field.', `You already inputed: ${inputData}`, 'error')
        $('#txtTrainerLevel').val('');
    }
})

$('#txtTrainerPower').on('input', function(){
    var inputData = $('#txtTrainerPower').val();
    if (isNaN(inputData)){
        MsgBox('Only input the number to this field.', `You already inputed: ${inputData}`, 'error')
        $('#txtTrainerPower').val('');
    }
})

$('#txtAttribute1Val').on('input', function(){
    var inputData = $('#txtAttribute1Val').val();
    if (isNaN(inputData)){
        MsgBox('Only input the number to this field.', `You already inputed: ${inputData}`, 'error')
        $('#txtAttribute1Val').val('');
    }
})

$('#txtAttribute2Val').on('input', function(){
    var inputData = $('#txtAttribute2Val').val();
    if (isNaN(inputData)){
        MsgBox('Only input the number to this field.', `You already inputed: ${inputData}`, 'error')
        $('#txtAttribute2Val').val('');
    }
})

$('#txtAttribute3Val').on('input', function(){
    var inputData = $('#txtAttribute3Val').val();
    if (isNaN(inputData)){
        MsgBox('Only input the number to this field.', `You already inputed: ${inputData}`, 'error')
        $('#txtAttribute3Val').val('');
    }
})


$('#txtTrainerElement').on('change', function(){
    var data = $('#txtTrainerElement').val();
    var img = $('#imgTrainerElement');
    if(data == '')
    {
        img.attr('src', '')
    }
    else if(data == "STR"){
        img.attr('src', 'assets/fire-icon.png');
    }
    else if(data == "DEX"){
        img.attr('src', 'assets/land-icon.png');
    }
    else if(data == "CHA"){
        img.attr('src', 'assets/air-icon.png');
    }
    else if(data == "INT"){
        img.attr('src', 'assets/water-icon.png');
    }
})

$('#txtBunicornElement').on('change', function(){
    var data = $('#txtBunicornElement').val();
    var img = $('#imgBunicornElement');
    if(data == '')
    {
        img.attr('src', '')
    }
    else if(data == "STR"){
        img.attr('src', 'assets/fire-icon.png');
    }
    else if(data == "DEX"){
        img.attr('src', 'assets/land-icon.png');
    }
    else if(data == "CHA"){
        img.attr('src', 'assets/air-icon.png');
    }
    else if(data == "INT"){
        img.attr('src', 'assets/water-icon.png');
    }
})

$('#txtEnemyElement').on('change', function(){
    var data = $('#txtEnemyElement').val();
    var img = $('#imgEnemyElement');
    if(data == '')
    {
        img.attr('src', '')
    }
    else if(data == "STR"){
        img.attr('src', 'assets/fire-icon.png');
    }
    else if(data == "DEX"){
        img.attr('src', 'assets/land-icon.png');
    }
    else if(data == "CHA"){
        img.attr('src', 'assets/air-icon.png');
    }
    else if(data == "INT"){
        img.attr('src', 'assets/water-icon.png');
    }
})

$('#txtEnemyPower').on('input', function(){
    var pwr = $('#txtEnemyPower').val();
    if (isNaN(pwr)){
        MsgBox('Only input the number to this field.', `You already inputed: ${pwr}`, 'error');
        $('#txtEnemyPower').val('');
    }
    var output = `Enemy power: ${Math.floor(pwr * 0.9)} ~ ${Math.floor(pwr * 1.1)}`;
    $('#lbEnemyPwrRange').html(output);
    $('#lbResult').html('');
    $('#lbWinRate').html('');
})

function copyAddr(add){
    navigator.clipboard.writeText(add);
    Swal.fire({
        icon: 'success',
        title: 'Address copied',
        text: 'Thanks for donate',
        timer: 3000,
        position: 'top',
        toast: true,
        showConfirmButton: false
    });
}