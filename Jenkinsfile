pipeline {
    agent any

    tools {
        // Define the SonarQube scanner tool
        sonarScanner 'SonarQubeServer'
    }

    environment {
        // Define SonarQube environment variables
        SONARQUBE_SERVER = 'SonarQubeServer' // Name of the SonarQube server configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub
                git branch: 'main', url: 'https://github.com/Chit-Senghang/hang-blog-core.git'
            }
        }

        stage('Build') {
            steps {
                // Run your build commands here
                echo 'Building...'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Run SonarQube scan
                    withSonarQubeEnv('SonarQubeServer') {
                        sh 'sonar-scanner'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                // Run your test commands here
                echo 'Testing...'
            }
        }

        stage('Deploy') {
            steps {
                // Run your deploy commands here
                echo 'Deploying...'
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            // Optionally perform actions on successful completion
            echo 'Pipeline completed successfully!'
        }
        failure {
            // Optionally perform actions on failure
            echo 'Pipeline failed!'
        }
    }
}
