var gitHubAccessToken = 'token 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'

export const getOrgInfo = (orgName) => {

  var orgUrl = 'https://api.github.com/orgs/' + orgName

  return new Promise((resolve, reject) => {

    fetch(orgUrl, {method: "GET"})
    .then(async response => {
  
      const data = await response.json()

      //Send loads back to requester /fetchLoads() 
      resolve(data)


    }).catch(err => reject(err))
    
  })
}

export const getOrgMembers = (orgName) => {

  var orgMembersUrl = 'https://api.github.com/orgs/' + orgName + '/members?per_page=100'

  return new Promise((resolve, reject) => {


    fetch(orgMembersUrl, {method: "GET"})
    .then(async response => {
  
      const data = await response.json()

      //Send loads back to requester /fetchLoads() 
      resolve(data)

    }).catch(err => reject(err))
    
  })
}

export const getRepoList = (orgName) => {

  var repoUrl = 'https://api.github.com/orgs/' + orgName + '/repos?per_page=100'

  return new Promise((resolve, reject) => {

    fetch(repoUrl, {method: "GET"})
    .then(async response => {
  
      const data = await response.json()

      //Send data back to requester, fetchRepoList() 
      resolve(data)

    }).catch(err => reject(err))
  })
}

export const getCommitList = (commitsUrl) => {

  //Limit 20 results for commit list
  var resultsLimit = "?per_page=20"

  return new Promise((resolve, reject) => {
    
    fetch(commitsUrl + resultsLimit, {method: "GET"})
    .then(async response => {
  
      const data = await response.json()

      //Send loads back to requester /fetchLoads() 
      resolve(data)

    }).catch(err => reject(err))
    
  })
 
}

