window.onload = function(){
	//buttons
	var quickAddbtn = document.getElementById("QuickAdd");
	var addBtn = document.getElementById("Add");
	var cancelBtn = document.getElementById("Cancel");
	var quickAddFormDiv = document.querySelector(".quickaddForm");
	//document.getElemenetsByClassName ('quickaddForm')[0]

	//Form Fields

	var fullname = document.getElementById("fullname");
	var phone = document.getElementById("phone");
	var address = document.getElementById("address");
	var city = document.getElementById("city");
	var email = document.getElementById("email");

	//AddressBook

	var addBookDiv = document.querySelector(".addbook");

	//Creating Array

	var addressBook = [];

	//Event Listener

	quickAddbtn.addEventListener("click", function() {
		quickAddFormDiv.style.display = "block";
	})
	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = 'none';
	});

	addBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);

	function jsonStructure (fullname, phone, address, city, email){
		this.fullname = fullname;
		this.phone = phone;
		this.address = address;
		this.city = city;
		this.email = email;
		// body...
	}

	function addToBook(){
		var isNull = fullname.value!= '' && phone.value != '' && address.value != '' && city.value != '' && email.value != '';
		if(isNull){
			//this should add the content of the form into the array and local stoage
			var obj = new jsonStructure(fullname.value, phone.value, address.value, city.value, email.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);

			//hide panel
			quickAddFormDiv.style.display = "none";
			clearForm();

			showAddressBook();


					}

	}	
	function removeEntry(e){
		if(e.target.classList.contains("delbutton")){
			var remID = e.target.getAttribute("data-id");

			//remove entry from array

			addressBook.splice(remID, 1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}

	//this function clears the form after refresh
		function clearForm(){
			var frm = document.querySelectorAll(".formFields");
			for (var i in frm){
				frm[i].value = '';
			}
		}

		function showAddressBook(){
			if (localStorage['addbook'] === undefined){
				localStorage['addbook'] = "[]";
			} else {
				addressBook = JSON.parse(localStorage['addbook']);
				addBookDiv.innerHTML = '';
				for (var n in addressBook){
					var str = '<div class="entry">';
						str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
						str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
						str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
						str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
						str += '<div class="city"><p>' + addressBook[n].city + '</p></div>';
						str += '<div class="del"><a href="#" class="delbutton" data-id ="' + n + '">Delete</a></div>';
						str += '</div>';
						addBookDiv.innerHTML += str;
				}
			}
		}

		showAddressBook();
}