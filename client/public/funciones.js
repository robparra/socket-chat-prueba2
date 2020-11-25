function watchWords()
{
  var watch_words = ['OFFICIAL_ADMIN', 'BioMarin_OFFICIAL_ADMIN', 'CSL Behting_OFFICIAL_ADMIN', 'Pfizer_OFFICIAL_ADMIN', 'Novo Nordisk_OFFICIAL_ADMIN', 'CVS_OFFICIAL_ADMIN', 'Sanofi Genzyme_OFFICIAL_ADMIN', 'Genentech_OFFICIAL_ADMIN', 'Bayer_OFFICIAL_ADMIN', 'Spark_OFFICIAL_ADMIN', 'Accredo_OFFICIAL_ADMIN', 'uniQure_OFFICIAL_ADMIN', 'Octapharma_OFFICIAL_ADMIN', 'Takeda_OFFICIAL_ADMIN',];
  var textvalue = document.getElementById('text').value;
  for(var i=0; i<watch_words.length; i++) {
    if (~textvalue.indexOf(watch_words[i])){

        if(watch_words[i] == 'OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      } 

      if(watch_words[i] == 'BioMarin_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      } 

      if(watch_words[i] == 'CSL Behting_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }

      if(watch_words[i] == 'Pfizer_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }

      if(watch_words[i] == 'Novo Nordisk_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }

      if(watch_words[i] == 'CVS_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }

      if(watch_words[i] == 'Sanofi Genzyme_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }

      if(watch_words[i] == 'Genentech_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }

      if(watch_words[i] == 'Bayer_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }

      if(watch_words[i] == 'Spark_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }

      if(watch_words[i] == 'Accredo_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }

      if(watch_words[i] == 'uniQure_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }

       if(watch_words[i] == 'Octapharma_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }

       if(watch_words[i] == 'Takeda_OFFICIAL_ADMIN'){
        alert('You are not the OFFICIAL_ADMIN ');
        document.getElementById("text").value = "";
      }
      
    }
  }
}

function passCheck(){
      if(prompt("Please enter your password","") == "admin"){
        window.location = "privado.html";
      }else{
        alert("Wrong Password!")
        return false;
      }
    }

function enviarTexto(){
        var texto = document.getElementById("form-control").value;
        document.getElementById("admin").value=texto+"_OFFICIAL_ADMIN";

    }