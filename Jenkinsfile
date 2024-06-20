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
        sh 'cp /var/jenkins_home/workspace/config/.env.client .env'
      }
    }
    stage('build') {
      steps {
        echo 'build react'
        sh 'docker build -t tofin-client .'
        sh 'docker run --name tofin-client -v ./output:/output'
      }
    }
    stage('deploy') {
      steps {
        echo 'run docker container'
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
            cleanRemote: false, // clean remote dir
            excludes: '',
            execCommand: "cp -rfT ./jenkins/output/ /usr/share/nginx",
            execTimeout: 120000,
            makeEmptyDirs: true,
            noDefaultExcludes: false,
            remoteDirectory: 'jenkins',
            remoteDirectorySDF: false,
            removePrefix: 'output',
            sourceFiles: 'output/**'
          )
        ]
      )
    ]
  )
}