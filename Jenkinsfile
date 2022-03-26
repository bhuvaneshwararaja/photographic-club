node{
	environment {
		DOCKERHUB_CREDENTIALS=credentials('docker_id')
	}

	stages {

		stage('Build') {

			steps {
				sh 'docker build -t bhuvaneshwararaja/club-node-app:latest .'
			}
		}

		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push') {

			steps {
				sh 'docker push bhuvaneshwararaja/club-node-app:latest'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}

}
