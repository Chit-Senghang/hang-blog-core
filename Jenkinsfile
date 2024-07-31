pipeline {
    agent {
        label 'selt-host'
    }
    tools {
        nodejs 'NodeJS-20' // Ensure this is configured correctly in Jenkins
    }
    stages {
        stage('Lint') {
            steps {
                script {
                    sh 'yarn install' // Ensure dependencies are installed
                    sh 'yarn lint'    // Run the lint command
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
