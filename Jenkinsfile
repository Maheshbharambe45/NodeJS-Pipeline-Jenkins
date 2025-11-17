pipeline{
  agent any

  environment {
    IMG_NAME = 'maheshbharambe45/node_img'
    PORT_MAPPING = '8081:3000'
    MINIKUBE_IP = '3.110.80.110'
  }
  stages{
    stage('check_files'){
      steps{
        sh '''
          ls -l 
        '''
      }
    }

    stage('Run Tests') {
      steps {
          echo 'Running Jest tests...'
          sh 'npm install'
          sh 'npm test'
      }
  }
  stage('building the application'){
    steps{
      sh '''
      echo "Building the application------------->"
      docker build -t $IMG_NAME .
      '''
    }
  }


  // stage('Running a docker container'){
  //   steps{
  //     sh '''
  //     echo "Running  container from created img----------->"
  //     docker run -d --name "my_container" -p $PORT_MAPPING $IMG_NAME
  //     '''
  //   }
  // }

 stage(' Push Image') {
            steps {
                 withCredentials([usernamePassword(credentialsId: 'docker-crediantials', usernameVariable: 'MY_DOCKER_USER',
    passwordVariable: 'MY_DOCKER_PASS')]) {
                    sh '''
                        echo "$MY_DOCKER_PASS" | docker login -u "$MY_DOCKER_USER" --password-stdin
                        docker push $IMG_NAME
                       
                   '''
              }
        }
     }


  stage('run pod and service'){
    steps{
      sh '''
         kubectl apply -f deployment.yaml
         kubectl apply -f service.yml

      '''
    }
  }
    

    stage("Deploy to Minikube on EC2") {
  steps {
    withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY')]) {
      // Upload both YAML files to EC2
      sh """
        scp -i "$SSH_KEY" -o StrictHostKeyChecking=no deployment.yaml service.yml \
        ubuntu@${MINIKUBE_IP}:/home/ubuntu/
      """

      // Apply on Minikube
      sh """
        ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no ubuntu@${MINIKUBE_IP} '
          kubectl apply -f deployment.yaml
          kubectl apply -f service.yml

          # Show deployed resources
          kubectl get all -A
        '
      """
    }
  }
}

    
  }
  
}
