var maxUsers = 12;// 最大用户数量
var userCollection = new UserCollection(maxUsers);// 用户集合
var myName = null;// 当前用户名
var mySessionId = "";//当前用户的SessionId

var subject = '/newchat';// 定义事件主题
var sublogin = '/login'//登录事件

// Object to represent single user
function UserEntry(name, presence,id) {

	// Its name
	this.name = name;

	// Presence state
	// ranges from '!' (very present), '?' (present), '-' (zombie), '~' (dead),
	// '' (not present)
	this.presence = presence;
	this.id = id;

}

// Represents list of UserEntries
function UserCollection(size) {

	// Member var setup
	this.userArray = new Array(size);
	this.size = size;

	// Make list with empty user entries
	for ( var i = 0; i < size; i++) {
		this.userArray[i] = new UserEntry('', '');
	}

	// Member function setup
	this.indexOf = UserCollectionIndexOf;
	this.get = UserCollectionGet;
	this.add = UserCollectionAdd;
	this.remove = UserCollectionRemove;

}

// UserCollection.indexOf method: return index of user name
function UserCollectionIndexOf(user) {
	for ( var i = 0; i < this.size; i++) {
		if (this.userArray[i].name == user) {
			return i;
		}
	}
	return -1;
}

// UserCollection.get method: get UserEntry at index
function UserCollectionGet(index) {

	return this.userArray[index];

}

// UserCollection.add method: add user at empty slot and return index
function UserCollectionAdd(userEntry) {

	for ( var i = 0; i < this.size; i++) {
		if (this.userArray[i].name == '') {
			this.userArray[i] = userEntry;
			return i;
		}
	}

	return -1;

}

// UserCollection.remove method: remove UserEntry at index
function UserCollectionRemove(index) {

	this.userArray[index] = new UserEntry('', '','');

}

// Display a single user entry in the layerGrid
function displayUserEntry() {

	var user = document.getElementById("ul-user");
	user.innerHTML = "";
	
	var name = "";
	var presen = "";
	var sessionid="";
	var li = "";
	var dialogWindow;
	for ( var i = 0; i < userCollection.size; i++) {

		name = userCollection.userArray[i].name;
		presen = userCollection.userArray[i].presence;
		sessionid = userCollection.userArray[i].id;
		
		 if(name!=''){
			 
			 
				li = document.createElement("li");

				var span_avatar = document.createElement("span");
				span_avatar.innerHTML = "<img src='images/user.gif'></a>";
				span_avatar.className = "avatar";

				var span_name = document.createElement("span");
				span_name.innerHTML = "<a href='' onclick='return false;'>" + name
						+ "</a>";
				span_name.className = "name";
				span_name.setAttribute("id","sessionId");//设置该用户的id为session的编号
				
				var span_onlinestatus = document.createElement("span");
				span_onlinestatus.innerHTML = "<a><img title='人人桌面在线' src='images/online_std.png'></a>";
				span_onlinestatus.className = "online-status";

				li.appendChild(span_avatar);
				li.appendChild(span_name);
				li.appendChild(span_onlinestatus);

				span_name.addEventListener("click", (function(name,sessionid){
					
					return function(){
						
						//alert("from:"+myName+" to:"+name);
						//newDialogWindow(myName,name);
						if(name!=myName){
							
							//点击的不是自己
							$('#window-to-'+name).toggle();
							
						}
						
					};
					
				})(name,sessionid), false);
				
				user.appendChild(li);
				
				if(document.getElementById("window-to-"+name) == null){
					
					dialogWindow =  document.createElement("div").innerHTML="<div class='window' id='window-to-"+name+"' style='left:400px;top:100px;display:none'>" +
					"<div class='title'><div class='header'><img src='images/user.gif'/></div>" +
					"<h4>you are chat to "+name+"</h4>" +
					"<div class='menu'><span class='minimize' title='最小化'>-</span></div></div>" +
					"<div class='dialog-box'> " +
					"<div class='dialog-list' id='dialog-list-"+name+"'>" +
					"</div>" +
					"</div>" +
						"<div class='editor-box'>" +
							"<form class='editor' id='dialog-form-'"+name+">" +
								"<textarea id='textarea-"+name+"'></textarea>" +
								"<input type='button' style='background:url(images/send-button.png)' class='send-button' id='button-"+name+"-"+sessionid+"' onClick='sendMessage()' value='Send'>" +
							"</form>" +
						"</div>" +
					"</div>";
					
					$(dialogWindow).insertBefore('#friends-panel').Drag();
					
				}
				
				
		 }
		 
	}
	
	
}

function sendMessage(event){
	
	var event = event||window.event;
	
	var target = event.target||event.srcElement;
	
	var strid = $(target).attr('id');
	var size = strid.length;
	var index = strid.indexOf('-');
	var name_sessionid = strid.substring(index+1,size);
	
	var size2 = name_sessionid.length;
	var index2 = name_sessionid.indexOf('-');
	var name = name_sessionid.substring(0,index2);
	
	var id = name_sessionid.substring(index2+1,size2);
	
	console.log("name:"+name+",id:"+id);
	
	
	var msg =$('#textarea-'+name).val();
	
	console.log("id:"+strid+",name:"+name+",mesg:"+msg);
	
	if (myName != null) {
		    
		 //p_publish(subject, 'action', 'alert', 'to', name, 'from', myName, 'msg', msg,'p_to',id);
		p_publish(subject, 'action', 'alert', 'to', name, 'from', myName, 'msg', msg);
		 $('#dialog-list-'+name).append('<p><b>'+myName+':</b>'+msg+'</p>');
	      
	}
	
	 
}

// Set our own name
function setLocalUser(name,password) {
	myName = name;
	//doPresence(password);
	doPresence(password);
}

// Get our own name
function getLocalUser(name) {
	return myName;
}



function doPresence(password) {

	// Indicate our presence once we supplied a name
	if (myName != null) {
		// alert('send url: ' + url);presence
		//p_publish(subject, 'action', 'login', 'user', myName,'password',password);
		p_publish(subject, 'action', 'presence', 'user', myName,'password',password);
	}
	// Loop forever
	setTimeout("doPresence()", 10000);

}


function ageUsers() {
	
	  // Assume user presence diminished until proven with /wcq/presence event
	  for (var i = 0; i < maxUsers; i++) {
	    userEntry = userCollection.get(i);
	    if (userEntry.name != '') {
	      if (userEntry.presence == '!') {
	        userEntry.presence = '?';
	        displayUserEntry();
	      } else if (userEntry.presence == '?') {
	        userEntry.presence = '-';
	        displayUserEntry();
	      } else if (userEntry.presence == '-') {
	        userEntry.presence = '~';
	        displayUserEntry();
	      } else if (userEntry.presence == '~') {
	        userCollection.remove(i);
	        userEntry.presence = '';
	        displayUserEntry();
	       
	      }
	    }
	  }
	  // Check every N seconds
	  setTimeout("ageUsers()", 8000);
}


function init() {

	//p_join(subject);sublogin
	//p_listen(sublogin);
	p_join_listen(subject);
	window.open("login.html", "WEBIM","height=250, width=400, top=150, left=380, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no","_block");
	ageUsers();
	
}

//Callback from pushlet.html: determine event type and take appropriate action
function onData(event) {
	
  var action = event.get('action');
  var from = event.get('p_from');
  // Switch on action field
  if (action == 'alert') {
    // Alert message: if it is us display the message
    if (event.get('to') == myName) {
    	
    	 console.log("from:"+from);
    	$('#window-to-'+event.get('from')).show();
      //alert(unescape("message from "+event.get('from')+"\n"+event.get('msg')));
    	appendMessage(event.get('msg'),event.get('from'));	
    	
    }
    
  }
  else if (action == 'presence') {
    
	 var name = escape(event.get('user'));
     var index = userCollection.indexOf(name);

     // User not yet in collection: add a new entry and play sound
     if (index == -1) {
    	 
        index = userCollection.add(new UserEntry(name, '!',from));
        //alert("add new User:"+name);
     
     }
     // User in collection ? If so upgrade presence level and display
     if (index != -1) {
    	 
         userEntry = userCollection.get(index);
         // Upgrade to maximum presence
         userEntry.presence = '!';
         // And show its presence
         displayUserEntry();
         
     }
  
  }
  
}

function appendMessage(meg,from,to){
	
	$('#dialog-list-'+from).append('<p><b>'+from+':</b>'+meg+'</p>');
	
}
