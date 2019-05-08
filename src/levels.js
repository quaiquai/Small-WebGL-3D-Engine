// roomCubeMin = vec3(-5.0, -1.0, -5.0)
// roomCubeMax = vec3(5.0, 10.0, 5.0)

var objectsToDraw = [];

function level1() {
  var objects = [];
  // objects.push(new Cube(Vector.create([-0.25, 0.25, -0.25]), Vector.create([0.25, -0.0, 0.25]), nextObjectId++));
  objects.push(new Cube(Vector.create([-0.5, 1.15, -0.5]), Vector.create([0.5, 1.2, -0.1]), nextObjectId++));
  objects.push(new Cube(Vector.create([0.45, -1, -0.5]), Vector.create([0.5, 1.2, -0.1]), nextObjectId++));
  objects.push(new Cube(Vector.create([-0.45, -1, -0.5]), Vector.create([-0.5, 1.2, -0.1]), nextObjectId++));

  // objects.push(new Platform(Vector.create([4.0, -0.8, -5.0]), Vector.create([5.0, -0.5, -4.0]), nextObjectId++));

  var scene = makeNode(firstLevel);
  loadScene(scene, objects);
  console.log(scene)
  return objects;
}

//loads the scene from the nodes and calculates the translations from parent.
function loadScene(scene, objects){
  var currentObject = scene;
  if(currentObject.children[0] === undefined){
    objects.push(new Platform(Vector.create([scene.source.translationMin[0] + scene.worldMatrixMin[0], scene.source.translationMin[1] + scene.worldMatrixMin[1],
    scene.source.translationMin[2] + scene.worldMatrixMin[2]]), Vector.create([scene.source.translationMax[0] + scene.worldMatrixMax[0], scene.source.translationMax[1] + scene.worldMatrixMax[1],
    scene.source.translationMax[2] + scene.worldMatrixMax[2]]), nextObjectId++));
    return;
  }else{
    objects.push(new Platform(Vector.create([scene.source.translationMin[0] + scene.worldMatrixMin[0], scene.source.translationMin[1] + scene.worldMatrixMin[1],
    scene.source.translationMin[2] + scene.worldMatrixMin[2]]), Vector.create([scene.source.translationMax[0] + scene.worldMatrixMax[0], scene.source.translationMax[1] + scene.worldMatrixMax[1],
    scene.source.translationMax[2] + scene.worldMatrixMax[2]]), nextObjectId++));
    updateworldmatrix(scene);
    loadScene(scene.children[0], objects);
  }
  return;
}

function updateworldmatrix(scene){
  scene.children[0].worldMatrixMin[0] = scene.source.translationMin[0] + scene.worldMatrixMin[0];
  scene.children[0].worldMatrixMin[1] = scene.source.translationMin[1] + scene.worldMatrixMin[1];
  scene.children[0].worldMatrixMin[2] = scene.source.translationMin[2] + scene.worldMatrixMin[2];

  scene.children[0].worldMatrixMax[0] = scene.source.translationMax[0] + scene.worldMatrixMax[0];
  scene.children[0].worldMatrixMax[1] = scene.source.translationMax[1] + scene.worldMatrixMax[1];
  scene.children[0].worldMatrixMax[2] = scene.source.translationMax[2] + scene.worldMatrixMax[2];

  return scene;
}

//makes a node that holds info on scene
function makeNode(nodeDescription){
  var trs = new TRS()
  var node = new Node(trs)

  trs.translationMin = nodeDescription.translationMin;
  trs.translationMax = nodeDescription.translationMax;

  objectsToDraw.push(node);
  makeNodes(nodeDescription.children).forEach(function(child) {
    child.setParent(node);
  });

  return node;
}

function makeNodes(nodeDescriptions){
  return nodeDescriptions ? nodeDescriptions.map(makeNode) : [];
}

//the scene graph
var firstLevel =
{
      name: "firstStep",
      translationMin: [4.0, -0.8, -5.0],
      translationMax: [5.0, -0.5, -4.0],
      children: [
        {
           name: "secondStep",
           translationMin: [-2, 0.3, 0],
           translationMax: [-2, 0.3, 0],
           children: [
             {
               name: "thirdStep",
               translationMin: [-2, 0.3, 0],
               translationMax: [-2, 0.3, 0],
               children: [
                 {
                   name: "fourthStep",
                   translationMin: [-2, 0.3, 0],
                   translationMax: [-2, 0.3, 0],
                   children: [
                     {
                       name: "fourthStep",
                       translationMin: [-2, 0.3, 0],
                       translationMax: [-2, 0.3, 0],
                     },
                   ],
                 },
               ],
             },
           ],
        },
      ],
    };
