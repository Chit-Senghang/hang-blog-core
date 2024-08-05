pipeline {
    agent {
        label 'selt-host'
    }
    environment {
        SLACK_GENERAL_CHANNEL = '#general'
        SLACK_GENERAL = credentials('SLACK_GENERAL')
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
                channel: env.SLACK_GENERAL_CHANNEL,
                color: "#13d43a",  // Green for success
                message: "Job: ${JOB_NAME} \nBuild Number: ${BUILD_NUMBER} \nStatus: Success \nBuild URL: ${BUILD_URL}",
                sendAsText: false
            )
        }
        failure {
            slackSend(
                channel: env.SLACK_GENERAL_CHANNEL,
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
