// Models
class Room {
  constructor (name) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = "";
    this._items = [];
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

  get items () {
    return this._items;
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

  set items (value) {
    this._items.push(value)
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
    this._items = [];
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

  get items () {
    return this._items
  }

  set items (value) {
    if (value.length < 4) {
      alert('Conversation needs to be at least 4 characters');
      return;
    }
    this._items = value;
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

  // fight (item) {
  //   if (item == this._weakness) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}

class Friend extends Character {
  constructor (name, question) {
    super(name);
    this._question = question;
  }

  set items (value) {
    if (value.length < 4) {
      alert('Decription needs to be at least 4 characters');
      return;
    }
    this._items.push(value);
  }

  get items () {
    return this._items;
  }

  get question () {
    return this._question;
  }

  set question (value) {
    if (value.length < 4) {
      alert('Question needs to be at least 4 characters');
      return;
    }
    this._question = value;
  }
}

// class Item {
//   constructor(name) {
//     this._name = name
//     this._description = ""
//   }

//   set name(value) {
//     if (value.length < 4) {
//       alert("Name needs to be at least 4 characters");
//       return;
//     }
//     this._name = value;
//   }

//   set description(value) {
//     if (value.length < 4) {
//       alert("Decription needs to be at least 4 characters");
//       return;
//     }
//     this._name = value;
//   }

//   get name() {
//     return this._name;
//   }

//   get description() {
//     return this._description;
//   }

//   describe() {
//     return 'This is a ' + this._name
//   }
// }

// Instantiating Room
const Hallway = new Room('hallway');
Hallway.description = 'long narrow room with large portraits on the walls';
const Kitchen = new Room('kitchen');
Kitchen.description = 'large spacious room with worktops on all sides and a large table in the middle. There is a door to the north but it is locked.';
const Pantry = new Room('pantry');
Pantry.description = 'small room filled with food and drinks. There is a steel sword on the top shelf.';
const Lounge = new Room('lounge');
Lounge.description = 'large room with a chandelier in the ceiling and a red velvet sofa next to a fireplace';
const Bedroom = new Room('bedroom');
Bedroom.description = 'spacious room with a large red canopy bed in the middle. On the bed, there is a golden key. Type "take" to put the key into you backpack.';
const Courtyard = new Room('courtyard');
Courtyard.description = 'large green space with blossoming apple trees';
const cave = new Room('cave');
cave.description = "dark space with water dripping from the walls. There is a pot of gold right in the middle."

// Link Rooms
Hallway.linkRoom('west', Kitchen);
Hallway.linkRoom('east', Lounge);
Hallway.linkRoom('north', Courtyard);
Kitchen.linkRoom('east', Hallway);
// Kitchen.linkRoom('north', Pantry);
Pantry.linkRoom('south', Kitchen);
Lounge.linkRoom('west', Hallway);
// Lounge.linkRoom('north', Bedroom);
Bedroom.linkRoom('south', Lounge);
Courtyard.linkRoom('south', Hallway);

// Instantiate items
// const Steak = new Item('steak');
Pantry.items = 'sword';
Bedroom.items = 'key';

const Lady = new Friend('Alice');
Lady.conversation = 'Hello my friend. Would you like to chat?';
Lady.description = 'an old lady with kind eyes and long gray hair';
Lady.items = 'steak';
Lady.question = "Alice says 'Thank you for talking to me! Here is a steak for your journey. It might come in handy!'"
Kitchen.character = Lady;

const player = new Character('Player');

const Dragon = new Enemy('Draco');
Dragon.conversation = 'Fight me or die trying!';
Dragon.description = 'an angry dragon guarding the entrance to a cave';
Dragon.weakness = 'sword';

Courtyard.character = Dragon;

const Dog = new Enemy('Beast');
Dog.conversation = 'Grrrrr';
Dog.description = 'an angry growling guard dog';
Dog.weakness = 'steak';

Lounge.character = Dog;

// Functions
function displayRoom (room) {
  let occupantMsg = "";
  if (room.character == "") {
    occupantMsg = ""
  } else {
    occupantMsg = room.character.describe() + ". " + room.character.converse()
  }

  const textContent = room.describe() + 
    "</p>" + "<p>" + occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>"

  document.getElementById('textarea').innerHTML = textContent
  document.getElementById('ui').focus()
}

function commandAlert () {
  alert('That is not a valid command, please try again.')
}

function startGame () {
  let currentRoom = Hallway
  displayRoom(currentRoom)

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      let command = document.getElementById('ui').value
      command = command.toLowerCase()
      const options = ['talk', 'fight', 'take']
      const directions = ['north', 'south', 'east', 'west']
      const allMoves = options + directions
      if (allMoves.includes(command)) {
        if (directions.includes(command)) {
          currentRoom = currentRoom.move(command)
          displayRoom(currentRoom)
        } else {
          // Which room am I in
          // console.log(currentRoom)
          switch (currentRoom.name) {
            // Interactions
            case 'hallway':
              commandAlert()
              break;
            case 'kitchen':
              if (command === 'talk') {
                document.getElementById('textarea').innerHTML += Lady.question
                player.items.push(Lady.items[0])
                Lady.conversation = "It's nice to see you again, my friend."
              } else {
                commandAlert()
              }
              break;
            case 'lounge':
              if (command === 'fight' && player.items.includes(Dog.weakness)) {
                document.getElementById('textarea').innerHTML += 'Beast liked his tasty meal and has fallen asleep on the sofa. You can sneak past him and enter the door to the north'
                Lounge.linkRoom('north', Bedroom);
                Dog.description = 'sleeping on the sofa'
                Dog.conversation = 'Zzzzz'
              } else if (command === 'fight' && !player.items.includes(Dog.weakness)) {
                alert('Beast attacked you. You have lost the game.')
              } else {
                commandAlert()
              }
              break;
            case 'bedroom':
              if (command === 'take') {
                player.items.push(currentRoom.items[0])
                Bedroom.description = 'spacious room with a large red canopy bed in the middle.'
                Kitchen.linkRoom('north', Pantry);
                Kitchen.description = 'large spacious room with worktops on all sides and a large table in the middle.'
              } else {
                commandAlert()
              }
              break;
            case 'pantry':
              if (command === 'take') {
                player.items.push(currentRoom.items[0])
              } else {
                commandAlert()
              }
              break;
            case 'courtyard':
              if (command === 'fight' && player.items.includes(Dragon.weakness)) {
                document.getElementById('textarea').innerHTML += 'You killed the dragon with your sword. An entrance to the cave has opened in the north.'
                Courtyard.linkRoom('north', cave)
              } else if (command === 'fight' && !player.items.includes(Dragon.weakness)) {
                alert('Game over! You have been killed by the dragon.')
              } else {
                commandAlert()
              }
              break;
            case 'cave':
              if (command === 'take') {
                alert('Well done! You have won the game.')
              } else {
                commandAlert()
              }
          }
        }
      } else {
        document.getElementById('ui').value = ''
        commandAlert()
      }
    }
  });
}

startGame()



