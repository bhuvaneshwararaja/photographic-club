node{
    def commit_id
    stage('Preparation'){
        checkout scm
        sh "git rev-parse --short HEAD > .git/commit-id"
        commit_id = readFile('.git/commit-id').trim()
    }
    stage('docker build/push'){
        docker.withRegistry('https://index.docker.io/v1/', 'docker_id'){
            def app = docker.build("bhuvaneshwararaja/docker-club-nodejs-image:${commit_id}",'.').push()
        }
    }
}

	
