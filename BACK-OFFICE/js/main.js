function loadImage() {

    var input = document.getElementById('imageProduit');

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgProd')
                .attr('src', e.target.result)
                .width(200)
                .height(200);
        };
        reader.readAsDataURL(input.files[0]);
    }

}

function saveProduit()
{
    //recuperer le contenu des champs 
    var libelleProduit = document.getElementById("libelleProduit").value;
    var select = document.getElementById("typeProduit" );
    var valeur = select.options[select.selectedIndex].value;
    var prixProduit = document.getElementById("prixProduit").value;
    var descriptionProduit = document.getElementById("descriptionProduit").value;

    //var imageProduit = document.getElementById("imageProduit");
    var imgAsDataURL;

    var imgProd = document.getElementById("imgProd");
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

    // Make sure canvas is as big as the picture
    imgCanvas.width = imgProd.width;
    imgCanvas.height = imgProd.height;

    // Draw image into canvas element
    imgContext.drawImage(imgProd, 0, 0, imgProd.width, imgProd.height);

    // Get canvas contents as a data URL
    imgAsDataURL = imgCanvas.toDataURL("");
    console.log(imgAsDataURL);
    
  
   //creer un objet produit
  var produit ={
    id_produit:Math.round(Math.random()*100),
    libelle_produit:libelleProduit,
    libelle_type_produit:valeur,
    prix_produit:prixProduit,
    description_produit: descriptionProduit,
    image_produit: imgAsDataURL
    
    }

    var tabProduits = JSON.parse(localStorage.getItem("tabProduits")) || [];

    tabProduits.push(produit);

    localStorage.setItem("tabProduits",JSON.stringify(tabProduits));
    

}

function displayListeProduits() {
    var html = "";
    var tabProduits = JSON.parse(localStorage.getItem("tabProduits")) || [];
   
    

    for (i = 0; i < tabProduits.length; i++)
    {

        html +='<tr><td>' + tabProduits[i].libelle_produit + '</td>'
            + '<td>' + tabProduits[i].libelle_type_produit + '</td>'
            + '<td>' + tabProduits[i].prix_produit + '</td>'
            + '<td>' + tabProduits[i].description_produit + '</td>'
            + '<td><img src=' + tabProduits[i].image_produit + '></td></tr>';
  
    }
    document.getElementById("trTab").innerHTML = html;
    var dataSet = [html];
   
        $('#listeProduits').DataTable({
            data: dataSet,
            columns: [
                { title: "libelle_produit" },
                { title: "type_produit" },
                { title: "prix_produit" },
                { title: "description_produit" },
                { title: "image_produit" }
                
            ]
        });
  
   
    
}

/*********************************************/
function registerUser() {
    var prenom_utilisateur = document.getElementById("prenom_utilisateur").value;
    var nom_utilisateur = document.getElementById("nom_utilisateur").value;
    var date_naissance = document.getElementById("date_naissance").value;
    var email = document.getElementById("email").value;
    var mot_de_passe = document.getElementById("mot_de_passe").value;
  

     //creer un objet user
    var user = {
        id_utilisateur: Math.round(Math.random() * 100),
        prenom_utilisateur: prenom_utilisateur,
        nom_utilisateur: nom_utilisateur,
        date_naissance: date_naissance,
        email: email,
        mot_de_passe: mot_de_passe

    }
    var tabUsers = JSON.parse(localStorage.getItem("tabUsers"));
    if (tabUsers == null) {
        tabUsers = [];

    }
    tabUsers.push(user);
    localStorage.setItem("tabUsers", JSON.stringify(tabUsers));

}

function loginUser() {
    var email = document.getElementById("email").value;
    var mot_de_passe = document.getElementById("mot_de_passe").value;

    var tabUsers = JSON.parse(localStorage.getItem("tabUsers"));

    for (i = 0; i < tabUsers.length; i++) {

        if (tabUsers[i].email == email && tabUsers[i].mot_de_passe == mot_de_passe) {
            //creer loggedUser dans localstorage
            localStorage.setItem("LoggedUser", JSON.stringify(tabUsers[i]));
            window.location.href = "index2.html";
            return true;

        }

    }
    alert("user non inscrit!. Veuillez Enregistrer une nouvelle adhesion !.")
    
}

