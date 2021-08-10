class Room {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = "";
    this._item = "";
  }

  get name () {
    return this._name;
  }

  get description () {
    return this._description;
  }

  get character () {
    return this._character;
  }

  get item () {
    return this._item;
  }

  set name (value) {
    if (value.length < 4) {
      alert('Name needs to be at least 4 characters');
      return;
    }
    this._name = value;
  }

  set description (value) {
    if (value.length < 4) {
      alert('Description needs to be at least 4 characters');
      return;
    }
    this._description = value;
  }

  set character (value) {
    this._character = value;
  }

  set item (value) {
    this._item = value;
  }

  describe () {
    return 'You have entered the ' + this._name + '. It is a ' + this._description
  }

  linkRoom (direction, room) {
    this._linkedRooms[direction] = room;
  }

  move (direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can't got that way")
      return this;
    }
  }

  getDetails () {
    const entries = Object.entries(this._linkedRooms);
    let details = []
    for (const [direction, room] of entries) {
      let text = " The " + room._name + " is to the " + direction;
      details.push(text);
    }
    return details;
  }
}

class Character {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._conversation = "";
  }

  set name (value) {
    if (value.length < 4) {
      alert('Name needs to be at least 4 characters');
      return;
    }
    this._name = value;
  }

  set description (value) {
    if (value.length < 4) {
      alert('Decription needs to be at least 4 characters');
      return;
    }
    this._description = value;
  }

  set conversation (value) {
    if (value.length < 4) {
      alert('Conversation needs to be at least 4 characters');
      return;
    }
    this._conversation = value;
  }
  get name () {
    return this._name;
  }

  get description () {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }
     
  describe () {
    return 'You meet ' + this._name + ' who is ' + this._description
  }

  converse() {
    return this._name + " says " + "'" + this._conversation + "'";
  }
}     
    
class Enemy extends Character {
  constructor (name, weakness) {
    super(name);
    this._weakness = weakness;
    }
     
  set weakness (value) {
    if (value.length < 4) {
      alert('Decription needs to be at least 4 characters');
      return;
    }
    this._weakness = value;
  }

  get weakness () {
    return this._weakness;
  }

  fight (item) {
    if (item == this._weakness) {
      return true;
    } else {
      return false;
    }
  }
}

class Friend extends Character {
  constructor (name, item) {
    super(name);
    this._item = item;
    }
     
  set item (value) {
    if (value.length < 4) {
      alert('Decription needs to be at least 4 characters');
      return;
    }
    this._item = value;
  }
}

class Item {
  constructor(name) {
    this._name = name
    this._description = ""
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name needs to be at least 4 characters");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Decription needs to be at least 4 characters");
      return;
    }
    this._name = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  describe() {
    return 'This is a ' + this._name
  }
}

const Hallway = new Room('hallway');
Hallway.description = 'long narrow room with large portraits on the walls';
const Kitchen = new Room('kitchen');
Kitchen.description = 'large spacious room with worktops on all sides and a large table in the middle';
const Pantry = new Room('pantry');
Pantry.description = 'small room filled with food and drinks';
const Lounge = new Room('lounge');
Lounge.description = 'large room with a chandelier in the ceiling and a red velvet sofa next to a fireplace';
const Bedroom = new Room('bedroom');
Bedroom.description = 'spacious room with a large red canopy bed in the middle';
const Courtyard = new Room('courtyard');
Courtyard.description = 'large green space with blossoming apple trees';


Hallway.linkRoom('west', Kitchen);
Hallway.linkRoom('east', Lounge);
Hallway.linkRoom('north', Courtyard);
Kitchen.linkRoom('east', Hallway);
Kitchen.linkRoom('north', Pantry);
Pantry.linkRoom('south', Kitchen);
Lounge.linkRoom('west', Hallway);
Lounge.linkRoom('north', Bedroom);
Bedroom.linkRoom('south', Lounge);
Courtyard.linkRoom('north', Cave);
Courtyard.linkRoom('south', Hallway);


const Steak = new Item('steak');
const Sword = new Item('sword');
Pantry.item = Sword;
const Key = new Item('key');
Bedroom.item = Key;

const Lady = new Friend('Alice');
Lady.conversation = 'Hello my friend';
Lady.description = 'an old lady with kind eyes and long gray hair';
Lady.item = Steak;
Kitchen.character = Lady;

const Dragon = new Enemy('Draco');
Dragon.conversation = 'Zzzzzz';
Dragon.description = 'a sleeping dragon';
Dragon.weakness = 'sword';

Courtyard.character = Dragon;

const Dog = new Enemy('Beast');
Dog.conversation = 'Grrrrr';
Dog.description = 'an angry growling guard dog';
Dog.weakness = 'steak';

Lounge.character = Dog;


function displayRoom (room) {
  let occupantMsg = "";
  if (room.character == "") {
    occupantMsg = ""
  } else {
    occupantMsg = room.character.describe() + ". " + room.character.converse()
  }
      
  const textContent = room.describe() 
  + "</p>" + "<p>" + occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";
        
  document.getElementById('textarea').innerHTML = textContent;
  document.getElementById('ui').focus();
}



function startGame () {
  let currentRoom = Hallway;
  displayRoom(currentRoom);

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      const command = document.getElementById('ui').value;
      const directions = ['north', 'south', 'east', 'west']
      if (directions.includes(command.toLowerCase())) {
        currentRoom = currentRoom.move(command.toLowerCase())
        displayRoom(currentRoom);
      } else {
        document.getElementById('ui').value = ""
        alert('that is not a valid command, please try again')
      }
    }
  });
}

startGame()



