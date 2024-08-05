pipeline {
    agent {
        label 'selt-host'
    }
    tools {
        nodejs 'NodeJS-20'
    }
    stages {
        stage('Lint') {
            steps {
                script {
                    sh 'yarn install'
                    sh 'yarn lint'
                }
            }
        }
    }
    post {
        success {
            slackSend(
                color: "#13d43a",  // Green for success
                message: "Job: ${JOB_NAME} \nBuild Number: ${BUILD_NUMBER} \nStatus: Success \nBuild URL: ${BUILD_URL}",
                sendAsText: false
            )
        }
        failure {
            slackSend(
                color: "#ff0000",  // Red for failure
                message: "Job: ${JOB_NAME} \nBuild Number: ${BUILD_NUMBER} \nStatus: Failure \nBuild URL: ${BUILD_URL}",
                sendAsText: false
            )
        }
        always {
            script {
                echo 'Cleaning up...'
                cleanWs()
            }
        }
    }
}
