var $input    = document.getElementById('files'),
    $fileName = document.getElementById('file-name');

    $fileName.addEventListener("click", function(){
      $input.click();
    });

$input.addEventListener('change', function(){
    var nome = "Nenhum arquivo selecionado";
    if($input.files.length > 0) nome = $input.files[0].name;
    $fileName.innerHTML = nome;
});