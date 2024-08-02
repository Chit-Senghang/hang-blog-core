pipeline {
    agent {
        label 'selt-host'
    }
    environment {
        SLACK_CHANNELID = 'C07ESHQRANR'
        SLACK_TOKEN = credentials('SLACK_CHANNEL_TOKEN')
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
        stage('Scan Code') {
            steps {
                script {
                    def scannerHome = tool 'SonarQubeScanner'
                    withSonarQubeEnv() {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
        stage('Finish Process') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml down'
                }
            }
        }
    }
    post {
        success {
             slackSend(
                channel: env.SLACK_CHANNELID,
                color: "#13d43a",
                message: "ID: Name:Status: Success",
                sendAsText: false
            )
        }
        failure {
            slackSend(
                channel: env.SLACK_CHANNELID,
                color: "#13d43a",
                message: "ID: Name: Status: Failure",
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
