pipeline {
      agent any

     stages {
         stage('Checkout'){
           steps{
             cleanWs()
             deleteDir()
             checkout scm
           }
         }

        stage ('Main Stage') {
            steps {
                script {

                    if (env.BRANCH_NAME == "develop") {
                        stage('Build  image develop') {
                            imageNodeFrontend = docker.build("elmas19/frontend-develop:2.0.1-rc2","--build-arg ENV_NAME=develop --no-cache -f Dockerfile .");
                        }

                        stage ('run frontend test'){
                            junit skipPublishingChecks: true, allowEmptyResults: false, testResults: 'test-frontend-results.xml'
                            echo 'end test & coverage'
                        }

                        stage ('Deploying in develop'){
                            sh 'docker-compose  -f docker-compose-develop.yml --env-file .env.develop up -d --build --force-recreate develop-frontend'
                        }

                    }

                    else if (env.BRANCH_NAME == 'master') {

                        stage ('Pull & Merge Request') {
                           sh 'git config user.name "AnsouSy"'
                           sh 'git config user.email "gogs@gmail.com"'
                           sshagent(['jenkins']) {
                             sh 'git pull origin master'
                             sh 'git merge origin/preprod'
                             sh 'git push origin HEAD:master'
                           }
                        }
                        stage('Build  image develop') {
                            imageNodeFrontend = docker.build("elmas19/frontend-prod:2.0.1-rc2","--build-arg ENV_NAME=prod --no-cache -f Dockerfile .");
                        }

                        stage('Deploy  in DockerHub'){
                            withDockerRegistry([ credentialsId: "docker-hub", url: "" ]) {
                                sh 'docker push elmas19/frontend-prod:2.0.1-rc2'
                           }
                        }

                        stage('Deploy in prod'){
                           sh 'docker-compose -f docker-compose-prod.yml --env-file .env.prod up -d --build --force-recreate prod-frontend'
                        }

                    }
                    else if(env.BRANCH_NAME == 'preprod'){

                         stage ('Pull & Merge Request') {
                            sh 'git config user.name "AnsouSy"'
                            sh 'git config user.email "gogs@gmail.com"'
                            sshagent(['jenkins']) {
                              sh 'git pull origin preprod'
                              sh 'git merge origin/develop'
                              sh 'git push origin HEAD:preprod'
                            }
                         }

                         stage('Build  image preprod') {
                              imageNodeFrontend = docker.build("elmas19/frontend-preprod:2.0.1-rc2","--build-arg ENV_NAME=preprod --no-cache -f Dockerfile .");
                         }
                         stage ('run frontend test'){
                           junit skipPublishingChecks: true, allowEmptyResults: false, testResults: 'test-frontend-results.xml'
                           echo 'end test & coverage'
                         }

                         stage('deploy in preprod'){
                           sh 'docker-compose -f docker-compose-preprod.yml --env-file .env.preprod up -d --build --force-recreate preprod-frontend '
                         }

                    }
                }
            }
        }
    }
}

