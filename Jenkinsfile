void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/Team-Muffin/Client.git"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {
  agent any
	post {
    failure {
      setBuildStatus("Build failed", "FAILURE");
      slackSend (
        channel: 'C078D2K42MD',
        color: '#FF0000',
        message: "FAIL: Client Job ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
      )
    }
    success {
      setBuildStatus("Build succeeded", "SUCCESS");
      slackSend (
        channel: 'C078D2K42MD',
        color: '#00FF00',
        message: "SUCCESS: Client Job ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
      )
    }
  }
  stages {
    stage('init') {
        steps {
            echo 'init pipeline, check changes'
            setBuildStatus("Pending", "PENDING")
        }
    }
    stage('cofing') {
      steps {
        echo 'copy configuration files'
        sh 'pwd'
        sh 'cp /var/jenkins_home/workspace/configs/client/.env .env'
      }
    }
    stage('build') {
      steps {
        sh 'pwd'
        echo 'build react'
        sh 'docker build -t bkkmw/tofin-client .'
        sh 'docker push bkkmw/tofin-client'
        // sh 'docker run --name tofin-client -v ./output:/output tofin-client'
      }
    }
    stage('deploy') {
      steps {
        echo 'publish over ssh'
        publishOverSSH('webserver')
      }
    }
  }
}

def publishOverSSH(serverName) {
  sshPublisher(
    failOnError: true,
    publishers: [
      sshPublisherDesc(
        configName: serverName, // SSH server name
        verbose: true,
        transfers: [
          sshTransfer(
            cleanRemote: true, // clean remote dir
            excludes: '',
            execCommand: "sudo /bin/bash /home/ubuntu/depl/deploy.sh tofin-client",
            execTimeout: 120000,
            makeEmptyDirs: true,
            noDefaultExcludes: false,
            remoteDirectory: 'depl',
            remoteDirectorySDF: false,
            removePrefix: 'script',
            sourceFiles: 'script/deploy.sh'
          )
        ]
      )
    ]
  )
}