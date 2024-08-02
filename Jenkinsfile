pipeline {
    agent {
        label 'selt-host'
    }
    environment {
        MY_VAR = 'sonar-scanner'
        SLACK_CHANNELID = 'C07ESHQRANR'
        BUILD_URL = 'https://github.com/Chit-Senghang/hang-blog-core/edit/main/Jenkinsfile'
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
                message: "ID: Name: $JOB_NAME \n Status: Success \n Message: $SLACK_MSG_SUCCESS \n Report: $BUILD_URL",
                sendAsText: false
            )
        }
        failure {
            slackSend(
                channel: env.SLACK_CHANNELID,
                color: "#13d43a",
                message: "ID: Name: $JOB_NAME \n Status: Success \n Message: $SLACK_MSG_SUCCESS \n Report: $BUILD_URL",
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
