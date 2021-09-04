//
// This script was created by HarryTrinh, please don't make a copy with out my credit
//


function alignedPower(trainerElement, trainerLevel, trainerPower, attribute1, attribute2, attribute3, attribute1Val=0, attribute2Val=0, attribute3Val=0, bonusPower=0){
    attribute1Val = calcAttribute(trainerElement, attribute1, attribute1Val);
    attribute2Val = calcAttribute(trainerElement, attribute2, attribute2Val);
    attribute3Val = calcAttribute(trainerElement, attribute3, attribute3Val);
    var attributeTotal = attribute1Val + attribute2Val + attribute3Val;
    var result = ((attributeTotal + 1) * trainerPower) + bonusPower + 15 * (trainerLevel - 1);
    return result;
}

function unalignedPower(trainerPower, trainerLevel, attribute1Val=0, attribute2Val=0, attribute3Val=0, bonusPower=0){
   var attributeTotal = attribute1Val + attribute2Val +  attribute3Val;
   var result = (((attributeTotal * 0.0025) + 1 ) * trainerPower) + bonusPower + 15 * (trainerLevel - 1);
   return result;
}

//Tính chỉ số cộng hưởng nguyên tố thuộc tính của pet vs trainer
function calcAttribute(trainerElement, attributeElement,  attributeValue){
    // STR  -  Lửa
    // DEX  -  Đất
    // INT  -  Nước
    // CHA  -  Khí
    // PWR  -  trung tính
    if (attributeElement != trainerElement){
      return attributeValue * 0.0025
    }
    
    if (attributeElement == 'PWR'){
       return attributeValue * 0.002575
    }

    if(attributeElement == trainerElement){
       return attributeValue * 0.002675
    } 
}

// STR > DEX > CHA > INT > STR
const elements = {'STR' : 5, 'DEX': 4, 'CHA': 3, 'INT': 1}

// Tính element Bonus dưa vào xung khắc các nguyên tố 
function elementBonus(trainerElement, bunicornElement, enemyElement){
    var TraitBonus = 1
    var t = elements[trainerElement];
    var b = elements[bunicornElement];
    var e = elements[enemyElement];
    if (t == b){
        TraitBonus += 0.075
    }
    //Xét trường hợp đặc biệt của Lửa vs Nước
    if(trainerElement == 'STR' && enemyElement == 'INT'){
        TraitBonus -= 0.075
    }
    else{
        if(t > e){
            TraitBonus += 0.075
        }
        if(t < e){
            TraitBonus -= 0.075
        }
    }
    return TraitBonus
}



function finalPowerValue(trainerElement, trainerLevel, trainerPower, bunicornElement, attribute1, attribute2, attribute3, attribute1Val=0, attribute2Val=0, attribute3Val=0, bonusPower=0, enemyElement){
    var alignedPwr = alignedPower(trainerElement, trainerLevel, trainerPower, attribute1, attribute2, attribute3, attribute1Val, attribute2Val, attribute3Val, bonusPower);
    var elementBns = elementBonus(trainerElement, bunicornElement, enemyElement);
    var final = alignedPwr * elementBns;
    return [Math.floor(final * 0.9), Math.floor(final * 1.1)]
}

$(document).ready(function() {

});

$('#txtEnemyPower').on('input', function(){
    var pwr = $('#txtEnemyPower').val();
    var output = `Enemy power: ${Math.floor(pwr * 0.9)} ~ ${Math.floor(pwr * 1.1)}`;
    $('#lbEnemyPwrRange').html(output);
    $('#lbResult').html('');
    $('#lbWinRate').html('');
})

$('#btnCalc').on('click', function(){
    //Trainer
    var trainerElement = $('#txtTrainerElement').val();
    var trainerLevel = $('#txtTrainerLevel').val();
    var trainerPower = $('#txtTrainerPower').val();
    //Bunicorn
    var  bunicornElement =  $('#txtBunicornElement').val();
    var attribute1 = $('#txtAttribute1').val();
    var attribute2 = $('#txtAttribute2').val();
    var attribute3 = $('#txtAttribute3').val();
    var attribute1Val = $('#txtAttribute1Val').val();
    var attribute2Val = $('#txtAttribute2Val').val();
    var attribute3Val = $('#txtAttribute3Val').val();
    var bonusPower = $('#txtBonusPower').val();
    var enemyElement = $('#txtEnemyElement').val();
    //Check input
    if (trainerElement == ''){
        MsgBox("Please select your trainer element", '', 'error')
        return;
    }
    if(trainerLevel == ''){
        trainerLevel = 0
    }
    if(trainerPower == ''){
        trainerPower = 0
    }
    if (bunicornElement == ''){
        MsgBox("Please select your bunicorn element", '', 'error')
        return;
    }
    if (attribute1 == ''){
        MsgBox("Please select bunicorn attribute 1 element", '', 'error')
        return;
    }
    if(attribute1Val == ''){
        attribute1Val = 0;
    }
    if(attribute2Val == ''){
        attribute2Val = 0;
    }
    if(attribute3Val == ''){
        attribute3Val = 0;
    }
    if(bonusPower == ''){
        bonusPower = 0;
    }
    if (enemyElement == ''){
        MsgBox("Please select enemy element", '', 'error')
        return;
    }
    if (enemyElement == ''){
        MsgBox("Please input enemy power", '', 'error')
        return;
    }
    var a = finalPowerValue(trainerElement, trainerLevel, trainerPower, bunicornElement,  attribute1, attribute2, attribute3, attribute1Val, attribute2Val, attribute3Val, bonusPower, enemyElement)
    var str = `Your power: ${a[0]} ~ ${a[1]}`;
    $('#lbResult').html(str);
    var enemyPwr = $('#txtEnemyPower').val();
    var maxEnemyPwr = Math.floor(enemyPwr * 1.1);
    var winRate = (1 - (maxEnemyPwr - a[0]) / a[1]) * 100;
    $('#lbWinRate').html('Win rate: ' + Math.floor(winRate) + '%');
})

function MsgBox(title, message, icon){
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        //confirmButtonText: 'Cool'
      })
}

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