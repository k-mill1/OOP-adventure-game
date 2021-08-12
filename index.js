// Models
class Room {
  constructor (name) {
    this._name = name
    this._description = ''
    this._linkedRooms = {}
    this._character = ''
    this._items = []
    this._repeatInteraction = false
    this._lockedDoor = false
  }

  set name (value) {
    this._name = value
  }

  set description (value) {
    this._description = value
  }

  set character (value) {
    this._character = value
  }

  set items (value) {
    this._items.push(value)
  }

  set repeatInteraction (value) {
    this._repeatInteraction = value
  }

  set lockedDoor (value) {
    this._lockedDoor = value
  }

  get name () {
    return this._name
  }

  get description () {
    return this._description
  }

  get character () {
    return this._character
  }

  get items () {
    return this._items
  }

  get repeatInteraction () {
    return this._repeatInteraction
  }

  get lockedDoor () {
    return this._lockedDoor
  }

  describe () {
    return 'You have entered the ' + this._name + '. It is a ' + this._description
  }

  linkRoom (direction, room) {
    this._linkedRooms[direction] = room
  }

  move (direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction]
    } else {
      alert("You can't got that way")
      return this
    }
  }

  getDetails () {
    const entries = Object.entries(this._linkedRooms)
    const details = []
    for (const [direction, room] of entries) {
      const text = ' The ' + room._name + ' is to the ' + direction
      details.push(text)
    }
    return details
  }
}

class Character {
  constructor (name) {
    this._name = name
    this._description = ''
    this._conversation = ''
    this._items = []
    this._repeatInteraction = false
  }

  set name (value) {
    this._name = value
  }

  set description (value) {
    this._description = value
  }

  set conversation (value) {
    this._conversation = value
  }

  set items (value) {
    this._items.push(value)
  }

  set repeatInteraction (value) {
    this._repeatInteraction = value
  }

  get name () {
    return this._name
  }

  get description () {
    return this._description
  }

  get conversation () {
    return this._conversation
  }

  get items () {
    return this._items
  }

  get repeatInteraction () {
    return this._repeatInteraction
  }

  describe () {
    return 'You meet ' + this._name + ' who is ' + this._description
  }

  converse () {
    return this._name + ' says ' + "'" + this._conversation + "'"
  }
}

class Enemy extends Character {
  constructor (name, weakness) {
    super(name)
    this._weakness = weakness
  }

  set weakness (value) {
    this._weakness = value
  }

  get weakness () {
    return this._weakness
  }
}

class Friend extends Character {
  constructor (name, reply) {
    super(name)
    this._reply = reply
  }

  set reply (value) {
    this._reply = value
  }

  get reply () {
    return this._reply
  }
}

// Instantiate Rooms
const hallway = new Room('hallway')
hallway.description = 'long narrow room with large portraits on the walls.'
const kitchen = new Room('kitchen')
kitchen.description = 'large spacious room with a wooden table in the middle. There is a door to the north but it is locked.'
const pantry = new Room('pantry')
pantry.description = 'small room filled with food and drinks. There is a steel sword on the top shelf.'
pantry.items = 'sword'
const lounge = new Room('lounge')
lounge.description = 'large room with a chandelier in the ceiling and a red velvet sofa next to a fireplace.'
const bedroom = new Room('bedroom')
bedroom.description = 'spacious room with a large red canopy bed in the middle. On the bed, there is a golden key.'
bedroom.items = 'key'
const courtyard = new Room('courtyard')
courtyard.description = 'large green space with blossoming apple trees.'
const cave = new Room('cave')
cave.description = 'dark space with water dripping from the walls. There is a pot of gold right in the middle of the cave.'

// Link Rooms
hallway.linkRoom('west', kitchen)
hallway.linkRoom('east', lounge)
hallway.linkRoom('north', courtyard)
kitchen.linkRoom('east', hallway)
pantry.linkRoom('south', kitchen)
lounge.linkRoom('west', hallway)
bedroom.linkRoom('south', lounge)
courtyard.linkRoom('south', hallway)

// Instantiate Characters
const lady = new Friend('Alice')
lady.conversation = 'Hello my friend. Would you like to chat?'
lady.description = 'an old lady with kind eyes and long gray hair'
lady.items = 'steak'
lady.reply = "Alice says 'Thank you for talking to me! Here is a steak for your journey. It might come in handy!'"
kitchen.character = lady

const player = new Character('Player')

const dragon = new Enemy('Draco')
dragon.conversation = 'Fight me or die trying!'
dragon.description = 'an angry dragon guarding the entrance to a cave'
dragon.weakness = 'sword'
courtyard.character = dragon

const dog = new Enemy('Beast')
dog.conversation = 'Grrrrr'
dog.description = 'an angry growling guard dog'
dog.weakness = 'steak'
lounge.character = dog

// Functions

// Displays room information
function displayRoom (room) {
  let occupantMsg = ''
  if (room.character == '') {
    occupantMsg = ''
  } else {
    occupantMsg = room.character.describe() + '. ' + room.character.converse()
  }

  const textContent = room.describe() +
    '</p>' + '<p>' + occupantMsg + '</p>' + '<p>' + room.getDetails() + '</p>'

  document.getElementById('textarea').innerHTML = textContent
  document.getElementById('ui').focus()
}

// alert after input of a valid game command that cannot be used in that situation
function optionsAlert () {
  alert("You can't use this command here.")
}

// alert after input that is not a valid game command
function notValidAlert () {
  alert('That is not a valid command, please try again.')
}

// display contents of the backpack
function showBackPack () {
  if (player.items.length < 1) {
    document.getElementById('textarea').innerHTML += '</p>' + '<p>' + 'Backpack is empty.'
  } else {
    document.getElementById('textarea').innerHTML += '</p>' + '<p>' + 'Backpack items: ' + player.items
  }
}

// display game over message and return to start page
function gameOver (msg) {
  alert(msg)
  window.location.reload()
}

// actions that happen after talking to the lady
function ladyInteraction () {
  document.getElementById('textarea').innerHTML += lady.reply
  player.items.push(lady.items[0])
  lady.conversation = "It's nice to see you again, my dear."
  lady.repeatInteraction = true
}

// actions that happen after winning the fight with the dog
function dogInteraction () {
  document.getElementById('textarea').innerHTML += 'Beast liked his tasty meal and has fallen asleep. You can sneak past him and enter the room to the north.'
  lounge.linkRoom('north', bedroom)
  dog.description = 'sleeping on the sofa'
  dog.conversation = 'Zzzzz'
  dog.repeatInteraction = true
}

// actions that happen after taking the key
function keyInteraction (currentRoom) {
  player.items.push(currentRoom.items[0])
  bedroom.description = 'spacious room with a large red canopy bed in the middle.'
  kitchen.linkRoom('north', pantry)
  kitchen.description = 'large spacious room with worktops on all sides and a large table in the middle.'
  bedroom.repeatInteraction = true
}

// actions that happen after taking the sword
function swordInteraction (currentRoom) {
  player.items.push(currentRoom.items[0])
  pantry.description = 'small room filled with food and drinks.'
  pantry.repeatInteraction = true
}

// actions that happen after winning the fight with the dragon
function dragonInteraction () {
  document.getElementById('textarea').innerHTML += 'You killed the dragon with your sword. An entrance to the cave has opened in the north.'
  courtyard.linkRoom('north', cave)
  dragon.repeatInteraction = true
}

// possible actions in each room
function roomInteractions (currentRoom, command) {
  switch (currentRoom.name) {
    case 'hallway':
      optionsAlert()
      break
    case 'kitchen':
      if (command === 'talk' && lady.repeatInteraction === false) {
        ladyInteraction()
      } else {
        optionsAlert()
      }
      break
    case 'lounge':
      if (command === 'fight' && player.items.includes(dog.weakness) && dog.repeatInteraction === false) {
        dogInteraction()
      } else if (command === 'fight' && !player.items.includes(dog.weakness)) {
        gameOver('Beast attacked you. Game over!')
      } else {
        optionsAlert()
      }
      break
    case 'bedroom':
      if (command === 'take' && bedroom.repeatInteraction === false) {
        keyInteraction(currentRoom)
      } else {
        optionsAlert()
      }
      break
    case 'pantry':
      if (command === 'take' && pantry.repeatInteraction === false) {
        swordInteraction(currentRoom)
      } else {
        optionsAlert()
      }
      break
    case 'courtyard':
      if (command === 'fight' && player.items.includes(dragon.weakness) && dragon.repeatInteraction === false) {
        dragonInteraction()
      } else if (command === 'fight' && !player.items.includes(dragon.weakness)) {
        gameOver('Game over! You have been killed by the dragon.')
      } else {
        optionsAlert()
      }
      break
    case 'cave':
      if (command === 'take') {
        alert('Well done! You have won the game.')
        window.location.reload()
      } else {
        optionsAlert()
      }
  }
}

// start the game
function startGame () {
  // set room at start to hallway
  let currentRoom = hallway
  displayRoom(currentRoom)

  // set all valid game commands
  const options = ['talk', 'fight', 'take', 'backpack']
  const directions = ['north', 'south', 'east', 'west']
  const allMoves = options + directions

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      let command = document.getElementById('ui').value
      command = command.toLowerCase()
      document.getElementById('ui').value = ''
      // what happens if user input is one of the valid moves
      if (allMoves.includes(command)) {
        // if user input is a valid direction, move into that room
        if (directions.includes(command)) {
          currentRoom = currentRoom.move(command)
          displayRoom(currentRoom)
          // if user input is 'backpack', show contents of the player's array
        } else if (command === 'backpack') {
          showBackPack()
          // if user input is any of the other valid options, take action dependent on the room player is in
        } else {
          roomInteractions(currentRoom, command)
        }
      // alert if user input does not match any valid commands
      } else {
        document.getElementById('ui').value = ''
        notValidAlert()
      }
    }
  })
}

startGame()
