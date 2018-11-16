function displayRepos(output, username, repos_num) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users/' + username + '/repos', true);
    request.send();
    request.onload = function() {
        var i;
        var data = JSON.parse(request.responseText);
        var name;
        var stars;
        var forks;
        var url_repo;
        var full_name;

        output += '<div class=repositories>';
        output += '<h3><strong>Repositories</strong></h3><hr>';

        if (repos_num <= 0) {
            output += "<div class='info_user'>" + username + " does not have any repositories</div><div><div>";
        } else {
            output += '<ul class="repo_list">';

            for (i = 0; i < repos_num; i++) {
                name = data[i].name;
                stars = data[i].stargazers_count;
                forks = data[i].forks_count;
                url_repo = data[i].html_url;
                output += '<li><a href="' + url_repo + '" target="_blank"><h3>'+ name + '</h3>';
                output += '<span class="octicon octicon-star">' + stars + '</span>';
                output += '&ensp;<span class="octicon octicon-git-branch">' + forks + '</span>';
                output += '</a></li>';
            }
            output += '</ul><div><div>';
        }
        document.getElementById('search-result').innerHTML = output;
    }

}

function displayUser() {
    document.getElementById('search-result').style.display = 'block';
    document.getElementById('search-result').innerHTML = "";
    document.getElementById('search-result').innerHTML = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    var username = document.getElementById("username").value;
    var output;
    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.github.com/users/' + username, true);
    request.send();
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            var full_name = data.name;
            var username = data.login;
            var profile_img = data.avatar_url;
            var profile_url = data.html_url;
            var biography = data.bio;
            var repos_num = data.public_repos;
            output = '<div id="user-all"><div class="user-profile">';
            output += '<div class="user-image"><img src="' + profile_img + '" width=100px height=100px alt="' + username + '"></div>';
            output += '<div class="user-information"><span class="name">@<a href="' + profile_url + '" target="_blank">' + username + '</a></span><br>';

            if (full_name == null) {
                output += '<h1>' + username + '</h1>';
            } else {
                output += '<h1>' + full_name + '</h1>';
            }

            if (biography != null) {
                output += '<span>' + biography + '</span>';
            }
            output += '</div></div>';

            displayRepos(output, username, repos_num);
        } else {
            document.getElementById('search-result').innerHTML = '<div class="error_user">Does not exist</div>';
        }


    }
}