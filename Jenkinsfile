pipeline {
    agent {
        label 'selt-host'
    }
    environment {
        SLACK_CHANNELID = 'C07ESHQRANR'  // Replace with your Slack channel ID or name
        // SLACK_CHANNEL_TOKEN = credentials('SLACK_CHANNEL_TOKEN') // This is not needed with the Slack plugin setup
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
                channel: env.SLACK_CHANNELID,
                color: "#13d43a",  // Green for success
                message: "Job: ${JOB_NAME} \nBuild Number: ${BUILD_NUMBER} \nStatus: Success \nBuild URL: ${BUILD_URL}",
                sendAsText: false
            )
        }
        failure {
            slackSend(
                channel: env.SLACK_CHANNELID,
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
