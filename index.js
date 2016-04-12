function githubStars(github){
  var str = '<a href="https://github.com/' + github + '/stargazers" target="_blank">';
  str += '<img src="https://img.shields.io/github/stars/' + github + '.svg?style=social">';
  str +='</a>'
  return str;
}

function githubIssues(github){
  var str = '<a href="https://github.com/' + github + '/issues" target="_blank">';
  str += '<img src="https://img.shields.io/github/issues/' + github + '.svg?style=flat-square"> ';
  str +='</a>';
  return str;
}

function packageBadge(name, package){
  var img = '<img src="https://img.shields.io/' + package + '/v/' + name + '.svg?style=flat-square"> ';

  var link = '';
  switch (package) {
    case 'npm':
      str = '<a href="https://www.npmjs.com/package/' + name + '" target="_blank">' + img + '</a>';
      break;
    case 'gem':
      str = '<a href="https://rubyvems.org/gem/' + name + '" target="_blank">' + img + '</a>';
      break;
    case 'bower':
      str = img;
  }
  return str;
}

function nameLink(name, github){
  return '<a href="https://github.com/' + github + '" target="_blank">' + name + '</a> ';
}

function getTableRow(block, type){
  var pkgName = block.args[0];
  var extras = block.kwargs;

  var github = extras.github || 'platanus/' + pkgName;
  var name = extras.name || pkgName.split('-').join(' ').split('_').map(function(word) {
    return word[0].toUpperCase() + word.substr(1);
  }).join(' ')

  var packageString = '';
  switch (type) {
    case 'gem':
      packageString = packageBadge(pkgName, 'gem');
      break;
    case 'angular':
      packageString = packageBadge(pkgName, 'npm') + packageBadge(pkgName, 'bower');
      break;
  }

  var str = '<tr>';
  str += '<td>';
  str += nameLink(name, github);
  str += '</td>';
  str += '<td>';
  str += packageString;
  str += '</td>';
  str += '<td>';
  str += githubIssues(github);
  str += githubStars(github);
  str += '</td>';
  str += '</tr>';
  return str;
}

module.exports = {
  blocks: {
    npmPackage: {
      process: function(block){
        return getTableRow(block, 'angular');
      }
    },
    rubyGem: {
      process: function(block){
        return getTableRow(block, 'gem');
      }
    },
    packagesTable: {
      process: function(block){
        var str = "<table>";
        str += "<thead>";
        str += "<tr><td>Name</td><td>Version</td><td>Github</td></tr>"
        str += "</thead>"

        str += "<tbody>";
        return str;
      }
    },
    finishPackagesTable: {
      process: function(block){
        var str = "</tbody>";
        str += "</table>"
        return str;
      }
    }
  }
};
