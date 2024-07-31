pipeline {
    agent {
        label 'selt-host'
    }
    environment {
        // Define any environment variables here if needed
    }
    stages {
        stage('Lint') {
            tools {
                nodejs 'NodeJS-20'
            }
            steps {
                script {
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
            script {
                echo 'Build succeeded!'
            }
        }
        failure {
            script {
                echo 'Build failed!'
            }
        }
        always {
            script {
                echo 'Cleaning up...'
                cleanWs()
            }
        }
    }
}
