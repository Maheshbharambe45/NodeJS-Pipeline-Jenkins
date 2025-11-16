pipeline{
  agent any

  environment {
    IMG_NAME = 'maheshbharmbe45/node_img'
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


  stage('Running a docker container'){
    steps{
      sh '''
      echo "Running  container from created img----------->"
 //     docker run -d --name "my_container" -p $PORT_MAPPING $IMG_NAME
      '''
    }
  }

  stage('check pods'){
    steps{
      sh '''
        kubectl get pods
      '''
    }
  }
    
  }
  
}
