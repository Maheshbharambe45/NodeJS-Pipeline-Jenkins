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




    
  }
  
}
