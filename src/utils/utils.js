// username的额外匹配规则...
export function checkLength(value, min=4, max=16) {
  const length = value.length;
  let count = 0;
  for (let i = 0; i < length; i++) {
    if (value.charCodeAt(i) < 256) {
      count++;
    } else {
      count += 2;
    }
  }
  return count >= min && count <= max;
}

export function getRequest(href = null) {
  let url = href == null ? location.search.substr(1) : href.substr(href.indexOf('?') + 1);
  let requestPairs = url.split('&');
  let request = [];
  for (let i = 0; i < requestPairs.length; i++) {
    let requestPair = requestPairs[i].split('=');
    request[requestPair[0]] = requestPair[1];
  }
  return request;
}

export function formatDate(dateString) {
  let date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.getHours() + ':' +date.getMinutes()
}

Number.prototype.format = function (args) {
  let temp = this.toString();
  let count = temp.length;
  let prefix = "";
  for (let i = 0; i < args - count; i++) {
    prefix += "0";
  }
  return prefix + temp;
};

export function safetyEmail(email) {
  return email.substring(0, 2) + '***' + email.substring(email.indexOf('@'));
}

/**
 * 求最长公共子序列
 * @param str1
 * @param str2
 * @return [] 最长子序列在str1中的位置
 */
export function lcs(str1, str2) {
  // TODO: 优化trace部分
  let dp = [];
  for (let i = 0; i <= str1.length; i++) {
    let line = [];
    for (let i = 0; i <= str2.length; i++) {
      line.push(0)
    }
    dp.push(line);
  }
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i-1] === str2[j-1]) {
        dp[i][j] = dp[i - 1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
      }
    }
  }
  let i = str1.length;
  let j = str2.length;
  let trace = [];
  while (i >= 1 && j >=1) {
    if (str1[i-1] === str2[j-1]) {
      trace.push(str1[i-1]);
      i--;
      j--
    } else {
      if (dp[i][j-1] > dp[i-1][j]) {
        j--
      } else i--
    }
  }
  trace.reverse();
  let result = [];
  let k = 0;

  for (let t = 0; t < str1.length; t++) {
    if (str1[t] === trace[k]) {
      k++;
      result[t] = true;
    } else result[t] = false;
  }
  return result;
}

export function isMobile() {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
}


export default {

}