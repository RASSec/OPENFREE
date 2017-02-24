//Copyright (c) 2003-2006 Microsoft Corporation.  All rights reserved.

function onld()
{
	// Insert form initialization code here. Example: Browser detection
}

function chkCookies()
{
	// Are cookies enabled?
	//
	var sCN = "cookieTest";

	// Get Date in the future so this will expire
	//
	var dt = new Date();
	dt.setSeconds(dt.getSeconds() + 2);

	document.cookie = sCN + "=1; expires=" + dt.toGMTString();
	var cookiesEnabled = document.cookie.indexOf(sCN + "=") != -1;

	if (cookiesEnabled == false)
	{
		shw(gbid("tblMid2"));
		hd(gbid("tblMid"));
	}
	
	return cookiesEnabled;
}

function ldCookie(un, next)
{
	// Check for username cookie
	//	
	var re = /(^|; )logondata=acc=([0|1])&lgn=([^;]+)(;|$)/;
	var rg = re.exec(document.cookie);
	
	if (rg)
	{
		// Fill in username, set security to private, and restore the "use basic" selection
		//
		
		gbid(un).value = rg[3];
		gbid(next).focus();
		gbid("rdoPrvt").click();
		
		if (rg[2] == "1")
			gbid("chkBsc").click();
		
	}
	else
	{
		// The variable g_fFcs is set to false when the password gains focus,
		// so that we don't accidentally set focus to the username field while
		// the user is typing their password
		//
		if (g_fFcs)
		{
			try
			{
				gbid(un).focus();
			}
			catch (e)
			{}
		}
	}
}

function clkExp(o)
{
    switch(o)
    {
        case lnkShwSec:
               hd(lnkShwSec);
               shw(lnkHdSec);
               shw(trPubExp);
               shw(trPrvtExp);
               lnkHdSec.focus();
               break;
        case lnkHdSec:
                shw(lnkShwSec);
                hd(lnkHdSec);
                hd(trPubExp);
                hd(trPrvtExp);
                lnkShwSec.focus();
                break;
    }
}

function clkExp2(o)
{
    switch(o)
    {
        case lnkShwSec2:
                hd(lnkShwSec2);
                shw(lnkHdSec2);
                shw(trPrvtExp2);
                lnkHdSec2.focus();
                break;
        case lnkHdSec2:
                shw(lnkShwSec2);
                hd(lnkHdSec2);
                hd(trPrvtExp2);
                lnkShwSec2.focus();
                break;
    }
}

function clkExp3(o)
{
    switch(o)
    {
        case lnkShwSec3:
            hd(lnkShwSec3);
            shw(lnkHdSec3);
            shw(trPrvtExp3);
            lnkHdSec3.focus();
            break;
        case lnkHdSec3:
            shw(lnkShwSec3);
            hd(lnkHdSec3);
            hd(trPrvtExp3);
            lnkShwSec3.focus();
            break;
    }
}

function clkExp4(o)
{
    switch(o)
    {
        case lnkShwExp4:
            hd(lnkShwExp4);
            shw(lnkHdExp4);
            shw(trPinSysExp);
            shw(trPinUserExp);
            lnkHdExp4.focus();
            break;
        case lnkHdExp4:
            shw(lnkShwExp4);
            hd(lnkHdExp4);
            hd(trPinSysExp);
            hd(trPinUserExp);
            lnkShwExp4.focus();
            break;
    }
}

function shw(o)
{
    o.style.display = "";
}

function hd(o)
{
    o.style.display = "none"
}

function clkLgn()
{
	// If security is set to private, add a cookie to persist username and basic setting
	// Cookie format: logondata=acc=<1 or 0>&lgn=<username>
	//
	if (gbid("rdoPrvt").checked)
	{
		// Calculate the expires time for two weeks
		//
		var oD = new Date();
		oD.setTime(oD.getTime() + 2*7*24*60*60*1000);
		var sA = "acc=" + (gbid("chkBsc").checked ? 1 : 0);
		var sL = "lgn=" + getUser().value;
		document.cookie = "logondata=" + sA + "&" + sL + "; expires=" + oD.toUTCString();
	}
}

function clkSec()
{
    var rdoPrvt = document.getElementById('rdoPrvt');
    var c = rdoPrvt.checked;
    if (c)
    {
	    trPrvtWrn.style.display = "";
    } else
    {
		trPrvtWrn.style.display = "none";
		// Remove the cookie by expiring it
		//
		var oD = new Date();
		oD.setTime(oD.getTime() - 9999);
		document.cookie = "logondata=; expires=" + oD.toUTCString();
    }
}

function clkBsc()
{
    var chkBsc = document.getElementById('chkBsc');
    if (chkBsc.checked)
    {
        trBscExp.style.display = "";
        chkBsc.value = 1;
    } else {
        trBscExp.style.display = "none";
        chkBsc.value = 0;
    }
}

function clkChpwd()
{
    var chkChpwd = document.getElementById('chpwd');
    if (chkChpwd.checked)
    {
		trChpwdExp.style.display = "";
		chkChpwd.value = "on";
    } else
    {
		trChpwdExp.style.display = "none";
		chkChpwd.value = "";
    }
}

function optClkSec()
{
    var optClk = document.getElementById('optClk');
    var c = optClk.checked;
    var un = document.getElementById('un');
    un.style.display = c ? "" : "none";
}

function clkPin()
{
    var chkPin = document.getElementById('rdoCPinSys');
    var newPin = document.getElementById('newpin');
    var nextPrn = document.getElementById('nextprn');
    if (chkPin.checked)
    {
        newPin.disabled = true;
        nextPrn.disabled = true;
    }
    else
    {
        newPin.disabled = false;
        nextPrn.disabled = false;
    }
}

function clkRtry()
{
	window.location.reload();
}

function gbid(s)
{
	return document.getElementById(s);
}

function getUser()
{
	var un = gbid("userid");
	if (!un)
	{
		return gbid("username");
	}
	return un;
}

// SIG // Begin signature block
// SIG // MIIbagYJKoZIhvcNAQcCoIIbWzCCG1cCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFKON9cFXc7kF
// SIG // 6YJvHvlPtEuH5AeJoIIV1zCCBIUwggNtoAMCAQICCmEI
// SIG // d18AAAAAAEowDQYJKoZIhvcNAQEFBQAweTELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENv
// SIG // ZGUgU2lnbmluZyBQQ0EwHhcNMTAwNzE5MjI1MzEwWhcN
// SIG // MTExMDE5MjI1MzEwWjCBgzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjENMAsGA1UECxMETU9QUjEeMBwGA1UEAxMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMIIBIjANBgkqhkiG9w0BAQEF
// SIG // AAOCAQ8AMIIBCgKCAQEAzH6Ae0H6i7RNmSlD3eb4Ut9b
// SIG // Qpe9Mxmc77Xa0MDc6PG3vlzhCrLCNaB+5PPUOKfyD0Jy
// SIG // p7qbzx8k3lYNhHPM02P3F82vaW9hTUyAT8h3HFFkyNME
// SIG // 8xQms7hCPzNDsNsmWViTtW2JYg8HVlvVEqCxCcwWK/mM
// SIG // 32FW6AZ4f9dziCYDZ9Gj/zSCrC1M2ALs7W+5ojHFMky7
// SIG // 9v1fYlte8fZkkceFd0cc9qcrRy0LN1RPth8EjbXsYCen
// SIG // 8362fKFMkaaLcdbGNWFHvMEVS92sMyK+BhmWS4oebgDr
// SIG // vh5p3VhZIQMrPL7mEwUXZjWnhi0a8dk0wAGAGvyaRp1u
// SIG // pOdI3DXqNwIDAQABo4IBAjCB/zATBgNVHSUEDDAKBggr
// SIG // BgEFBQcDAzAdBgNVHQ4EFgQU5G9fyon5U77wcFcGUKrC
// SIG // eQ2sVpswDgYDVR0PAQH/BAQDAgeAMB8GA1UdIwQYMBaA
// SIG // FFdFdBxdsPbIQwXgjFQtjzKn/kiWMEkGA1UdHwRCMEAw
// SIG // PqA8oDqGOGh0dHA6Ly9jcmwubWljcm9zb2Z0LmNvbS9w
// SIG // a2kvY3JsL3Byb2R1Y3RzL0NvZGVTaWdQQ0EuY3JsME0G
// SIG // CCsGAQUFBwEBBEEwPzA9BggrBgEFBQcwAoYxaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9Db2Rl
// SIG // U2lnUENBLmNydDANBgkqhkiG9w0BAQUFAAOCAQEAlkFd
// SIG // PVwrpM64KkUvQgJeoZAcTHQnCc4LVH1wKEFyO6QVvNEE
// SIG // Ulevd3RtC1VXhzcQSR7W5tTCY5S0/aQuLfpf4hlZFYTZ
// SIG // t7bpUqJS3iNfIC9Z06sahH8d473qD98BiDkl2O1kYRkb
// SIG // eq+mFEpGUEjZckvVS5Ld8A+EfMvTxvJMeG79vP9mEAr3
// SIG // A10V6l6YDAnSmY8utSC9YebJbwUUEct7+0IIvQPxJldn
// SIG // TY9Zi7hEx0XTYgQMLTADWF7sSPRuqBQxBP00orgELQLd
// SIG // OqEJXq1hsY9wwHhVI2Oon1l3otu5G3EoHPwu4QSPte80
// SIG // vkqZR+NkUhY8+r3g6OAUDBAiNIKCHjCCBLowggOioAMC
// SIG // AQICCmEFEzYAAAAAABowDQYJKoZIhvcNAQEFBQAwdzEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgUENBMB4XDTExMDcyNTIwNDIx
// SIG // N1oXDTEyMTAyNTIwNDIxN1owgbMxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsTHm5D
// SIG // aXBoZXIgRFNFIEVTTjoxNTlDLUEzRjctMjU3MDElMCMG
// SIG // A1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vydmlj
// SIG // ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
// SIG // AJw0mBnJCSljmQIWdaiIV32hu6lBEvxkkaXWBXi/d9zs
// SIG // 5q64UE7A4xq97bf9+CCKcTmqcpJyn4oJ5RPvkUHtYSVr
// SIG // Ua3uqEO1YUIsnfIdsdL8t/V7o3N2E7Mro9uUYYBVoQ9t
// SIG // 3djsFv+Ff5aeiH8ALo56JLponY/GyvSQeXrhm+8GXX74
// SIG // LsNqFZw8FC/n1ZTIIhtRy6lVhiG3WvNBEjmf8FWpTqol
// SIG // K2P7kXI8D3zAlnLcwaPBCMrexcm1wApfpZwLqnIKXQpA
// SIG // fS6Y0KuyiI+GgOh90b5Va+BYLMg2P/nmEcPwQwWFeAMX
// SIG // 5SynKXzT4pUXAGzb3K08GToC4H1i1M72HT0CAwEAAaOC
// SIG // AQkwggEFMB0GA1UdDgQWBBT2g4sghxHug8vb3oWi0miG
// SIG // N2F0kDAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7syuw
// SIG // wzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8vY3Js
// SIG // Lm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9N
// SIG // aWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsGAQUF
// SIG // BwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRU
// SIG // aW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsGAQUF
// SIG // BwMIMA0GCSqGSIb3DQEBBQUAA4IBAQBi9AUNT+cba4Ln
// SIG // UgzfeYyoVYEzl9Okysn+r0jbe9pveihPx9C3idjRppnM
// SIG // kVYAOzjotzIv7vnPa9mY3tYC9UJYUmuO2kDcFqCz1L8m
// SIG // FctIQszT/bT65ESJZg9CDl73BJ8jSFu0iUHE2mz4NvQ/
// SIG // wh4V35hMAMSy7N5fAQFDnLhC1iLIk5qeyaUYZ/xHhB6R
// SIG // XZvydvexjnIdgHY8NhFGyn46SPOv40n2FzONuwBjgpxX
// SIG // o1anw26Qoz6Vt/xk0V0YwgsBUGOn/PPRgJ6E4zI03VeV
// SIG // QKNtftrrLloItBAGXjLJCekygnEWp/rGr2aYifnZnrVf
// SIG // ECOjd4DyTdYoAHJQhbzlMIIGBzCCA++gAwIBAgIKYRZo
// SIG // NAAAAAAAHDANBgkqhkiG9w0BAQUFADBfMRMwEQYKCZIm
// SIG // iZPyLGQBGRYDY29tMRkwFwYKCZImiZPyLGQBGRYJbWlj
// SIG // cm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3NvZnQgUm9vdCBD
// SIG // ZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcNMDcwNDAzMTI1
// SIG // MzA5WhcNMjEwNDAzMTMwMzA5WjB3MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
// SIG // ggEKAoIBAQCfoWyx39tIkip8ay4Z4b3i48WZUSNQrc7d
// SIG // GE4kD+7Rp9FMrXQwIBHrB9VUlRVJlBtCkq6YXDAm2gBr
// SIG // 6Hu97IkHD/cOBJjwicwfyzMkh53y9GccLPx754gd6udO
// SIG // o6HBI1PKjfpFzwnQXq/QsEIEovmmbJNn1yjcRlOwhtDl
// SIG // KEYuJ6yGT1VSDOQDLPtqkJAwbofzWTCd+n7Wl7PoIZd+
// SIG // +NIT8wi3U21StEWQn0gASkdmEScpZqiX5NMGgUqi+YSn
// SIG // EUcUCYKfhO1VeP4Bmh1QCIUAEDBG7bfeI0a7xC1Un68e
// SIG // eEExd8yb3zuDk6FhArUdDbH895uyAc4iS1T/+QXDwiAL
// SIG // AgMBAAGjggGrMIIBpzAPBgNVHRMBAf8EBTADAQH/MB0G
// SIG // A1UdDgQWBBQjNPjZUkZwCu1A+3b7syuwwzWzDzALBgNV
// SIG // HQ8EBAMCAYYwEAYJKwYBBAGCNxUBBAMCAQAwgZgGA1Ud
// SIG // IwSBkDCBjYAUDqyCYEBWJ5flJRP8KuEKU5VZ5KShY6Rh
// SIG // MF8xEzARBgoJkiaJk/IsZAEZFgNjb20xGTAXBgoJkiaJ
// SIG // k/IsZAEZFgltaWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jv
// SIG // c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eYIQ
// SIG // ea0WoUqgpa1Mc1j0BxMuZTBQBgNVHR8ESTBHMEWgQ6BB
// SIG // hj9odHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2Ny
// SIG // bC9wcm9kdWN0cy9taWNyb3NvZnRyb290Y2VydC5jcmww
// SIG // VAYIKwYBBQUHAQEESDBGMEQGCCsGAQUFBzAChjhodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01p
// SIG // Y3Jvc29mdFJvb3RDZXJ0LmNydDATBgNVHSUEDDAKBggr
// SIG // BgEFBQcDCDANBgkqhkiG9w0BAQUFAAOCAgEAEJeKw1wD
// SIG // RDbd6bStd9vOeVFNAbEudHFbbQwTq86+e4+4LtQSooxt
// SIG // YrhXAstOIBNQmd16QOJXu69YmhzhHQGGrLt48ovQ7DsB
// SIG // 7uK+jwoFyI1I4vBTFd1Pq5Lk541q1YDB5pTyBi+FA+mR
// SIG // KiQicPv2/OR4mS4N9wficLwYTp2OawpylbihOZxnLcVR
// SIG // DupiXD8WmIsgP+IHGjL5zDFKdjE9K3ILyOpwPf+FChPf
// SIG // wgphjvDXuBfrTot/xTUrXqO/67x9C0J71FNyIe4wyrt4
// SIG // ZVxbARcKFA7S2hSY9Ty5ZlizLS/n+YWGzFFW6J1wlGys
// SIG // OUzU9nm/qhh6YinvopspNAZ3GmLJPR5tH4LwC8csu89D
// SIG // s+X57H2146SodDW4TsVxIxImdgs8UoxxWkZDFLyzs7BN
// SIG // Z8ifQv+AeSGAnhUwZuhCEl4ayJ4iIdBD6Svpu/RIzCzU
// SIG // 2DKATCYqSCRfWupW76bemZ3KOm+9gSd0BhHudiG/m4LB
// SIG // J1S2sWo9iaF2YbRuoROmv6pH8BJv/YoybLL+31HIjCPJ
// SIG // Zr2dHYcSZAI9La9Zj7jkIeW1sMpjtHhUBdRBLlCslLCl
// SIG // eKuzoJZ1GtmShxN1Ii8yqAhuoFuMJb+g74TKIdbrHk/J
// SIG // mu5J4PcBZW+JC33Iacjmbuqnl84xKf8OxVtc2E0bodj6
// SIG // L54/LlUWa8kTo/0wggaBMIIEaaADAgECAgphFQgnAAAA
// SIG // AAAMMA0GCSqGSIb3DQEBBQUAMF8xEzARBgoJkiaJk/Is
// SIG // ZAEZFgNjb20xGTAXBgoJkiaJk/IsZAEZFgltaWNyb3Nv
// SIG // ZnQxLTArBgNVBAMTJE1pY3Jvc29mdCBSb290IENlcnRp
// SIG // ZmljYXRlIEF1dGhvcml0eTAeFw0wNjAxMjUyMzIyMzJa
// SIG // Fw0xNzAxMjUyMzMyMzJaMHkxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xIzAhBgNVBAMTGk1pY3Jvc29mdCBDb2RlIFNpZ25p
// SIG // bmcgUENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
// SIG // CgKCAQEAn43fhTeMsQZWZjZO1ArrNiORHq+rjVjpxM/B
// SIG // nzoKJMTExF6w7hUUxfo+mTNrGWly9HwFX+WZJUTXNRmK
// SIG // kNwojpAM79WQYa3e3BhwLYPJb6+FLPjdubkw/XF4HIP9
// SIG // yKm5gmcNerjBCcK8FpdXPxyY02nXMJCQkI0wH9gm1J57
// SIG // iNniCe2XSUXrBFKBdXu4tSK4Lla718+pTjwKg6KoOsWt
// SIG // tgEOas8itCMfbNUn57d+wbTVMq15JRxChuKdhfRX2htZ
// SIG // Ly0mkinFs9eFo55gWpTme5x7XoI0S23/1O4n0KLc0ZAM
// SIG // zn0OFXyIrDTHwGyYhErJRHloKN8igw24iixIYeL+EQID
// SIG // AQABo4ICIzCCAh8wEAYJKwYBBAGCNxUBBAMCAQAwHQYD
// SIG // VR0OBBYEFFdFdBxdsPbIQwXgjFQtjzKn/kiWMAsGA1Ud
// SIG // DwQEAwIBxjAPBgNVHRMBAf8EBTADAQH/MIGYBgNVHSME
// SIG // gZAwgY2AFA6sgmBAVieX5SUT/CrhClOVWeSkoWOkYTBf
// SIG // MRMwEQYKCZImiZPyLGQBGRYDY29tMRkwFwYKCZImiZPy
// SIG // LGQBGRYJbWljcm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3Nv
// SIG // ZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHmCEHmt
// SIG // FqFKoKWtTHNY9AcTLmUwUAYDVR0fBEkwRzBFoEOgQYY/
// SIG // aHR0cDovL2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwv
// SIG // cHJvZHVjdHMvbWljcm9zb2Z0cm9vdGNlcnQuY3JsMFQG
// SIG // CCsGAQUFBwEBBEgwRjBEBggrBgEFBQcwAoY4aHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNy
// SIG // b3NvZnRSb290Q2VydC5jcnQwdgYDVR0gBG8wbTBrBgkr
// SIG // BgEEAYI3FS8wXjBcBggrBgEFBQcCAjBQHk4AQwBvAHAA
// SIG // eQByAGkAZwBoAHQAIACpACAAMgAwADAANgAgAE0AaQBj
// SIG // AHIAbwBzAG8AZgB0ACAAQwBvAHIAcABvAHIAYQB0AGkA
// SIG // bwBuAC4wEwYDVR0lBAwwCgYIKwYBBQUHAwMwDQYJKoZI
// SIG // hvcNAQEFBQADggIBADC8sCCkYqCn7zkmYT3crMaZ0IbE
// SIG // LvWDMmVeIj6b1ob46LafyovWO3ULoZE+TN1kdIxJ8oiM
// SIG // GGds/hVmRrg6RkKXyJE31CSx56zT6kEUg3fTyU8FX6MU
// SIG // Ur+WpC8+VlsQdc5Tw84FVGm0ZckkpQ/hJbgauU3lArlQ
// SIG // Hk+zmAwdlQLuIlmtIssFdAsERXsEWeDYD7PrTPhg3cJ4
// SIG // ntG6n2v38+5+RBFA0r26m0sWCG6kvlXkpjgSo0j0HFV6
// SIG // iiDRff6R25SPL8J7a6ZkhU+j5Sw0KV0Lv/XHOC/EIMRW
// SIG // MfZpzoX4CpHs0NauujgFDOtuT0ycAymqovwYoCkMDVxc
// SIG // ViNX2hyWDcgmNsFEy+Xh5m+J54/pmLVz03jj7aMBPHTl
// SIG // Xrxs9iGJZwXsl521sf2vpulypcM04S+f+fRqOeItBIJb
// SIG // /NCcrnydEfnmtVMZdLo5SjnrfUKzSjs3PcJKeyeY5+JO
// SIG // mxtKVDhqIze+ardI7upCDUkkkY63BC6Xb+TnRbuPTf1g
// SIG // 2ddZwtiA1mA0e7ehkyD+gbiqpVwJ6YoNvihNftfoD+1l
// SIG // eNExX7lm299C5wvMAgeN3/8gBqNFZbSzMo0ukeJNtKnJ
// SIG // +rxrBA6yn+qf3qTJCpb0jffYmKjwhQIIWaQgpiwLGvJS
// SIG // Bu1p5WQYG+Cjq97KfBRhQ7hl9TajVRMrZyxNGzBMMYIE
// SIG // /zCCBPsCAQEwgYcweTELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEj
// SIG // MCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQ
// SIG // Q0ECCmEId18AAAAAAEowCQYFKw4DAhoFAKCCASswGQYJ
// SIG // KoZIhvcNAQkDMQwGCisGAQQBgjcCAQQwHAYKKwYBBAGC
// SIG // NwIBCzEOMAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkE
// SIG // MRYEFHdHqtOYrIsEsha8pu6yAE0vo+yTMIHKBgorBgEE
// SIG // AYI3AgEMMYG7MIG4oIGHgIGEAEYAbwByAGUAZgByAG8A
// SIG // bgB0ACAAVABoAHIAZQBhAHQAIABNAGEAbgBhAGcAZQBt
// SIG // AGUAbgB0ACAARwBhAHQAZQB3AGEAeQAgAC0AIABLAEIA
// SIG // MgA1ADUANQA4ADQAMAAgAEMAaABpAG4AZQBzAGUAIABz
// SIG // AGkAbQBwAGwAZQBmAGkAZQBkoSyAKmh0dHA6Ly9zdXBw
// SIG // b3J0Lm1pY3Jvc29mdC5jb20/a2JpZD0yNTU1ODQwIDAN
// SIG // BgkqhkiG9w0BAQEFAASCAQBasVGE8LoJ2MmKXtlofthj
// SIG // olg0i3mBjYvkoIeQAdZijFDAm4zPciYWc6hD8nicyBdG
// SIG // qWXW3jMfGlboMCmyaWMLNThuEcyytytOgmDx2gqJYa4x
// SIG // L7UjwjZS8dCvtWydv+p0dAFrhSdSjIswVebgJ+xv+75y
// SIG // 2vCi+psBKHPFJlHB4diQg7mG1Q86mq1Cmtv4CoeM4j0u
// SIG // kceW9SOnnDsh9hQQm2OiyhojCI1pLAJFtj0zoidFQfHS
// SIG // QronydtL4QGERHGAvY48ZFlgeVWLr/NED3ZZHLPNzFD+
// SIG // A3g1R/lQHBNjGmwu9Yn3lFKzxjkrQbdEcLUDwji/Ut2R
// SIG // +zsTuOfn+gQBoYICHTCCAhkGCSqGSIb3DQEJBjGCAgow
// SIG // ggIGAgEBMIGFMHcxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xITAf
// SIG // BgNVBAMTGE1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQQIK
// SIG // YQUTNgAAAAAAGjAHBgUrDgMCGqBdMBgGCSqGSIb3DQEJ
// SIG // AzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTEx
// SIG // MDkxOTEzMjUwOVowIwYJKoZIhvcNAQkEMRYEFG9TdYuL
// SIG // utwQ2eqQfdPhRy6A7vVrMA0GCSqGSIb3DQEBBQUABIIB
// SIG // AGJ8mtsAuk+UMgjZVL70Ak+Cj4xzaf/9bH52tV0cU4O9
// SIG // Ik4xYeP7ypfL+3OXGRyn8APlDnTVfBSV2ljAAUmce/S/
// SIG // 1kKPnUnzbKNwLWj6OWzWhoiZGhElNCLQg9Ngd4wrcJ2R
// SIG // w8XLUiRcdCR0T1ZQ2xnr859WdOv0sFr5P2ZlubiHN+bp
// SIG // qoG1A4HKcsGE9Ewb4WSozVXudVX+t9XIbQvkEV82n4Jz
// SIG // zf+3xoQppRrnMKgkj8Y46aYupnnI+2vQwa4QydyPP3Dd
// SIG // WlN28T/0JEnmucLwv7/pZU0lx4eX/MA4cy01oFyFapSk
// SIG // NwpMwr1gTbOoMqsVhv9fadkWaUnf0D9KT7U=
// SIG // End signature block