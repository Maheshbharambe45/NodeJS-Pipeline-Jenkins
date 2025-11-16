pipeline{
  agent any

  environment {
    IMG_NAME = 'maheshbharambe45/node_img'
    PORT_MAPPING = '8081:3000'
  }
  stages{
    stage('check_files'){
      steps{
        sh '''
          ls -l 
        '''
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
        kubectl apply -f .
      '''
    }
  }
    
  stage('check pods'){
    steps{
      sh '''
        kubectl get all
      '''
    }
  }
    
  }
  
}
