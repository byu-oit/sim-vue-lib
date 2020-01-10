document.domain = 'byu.edu';

function doFeedBack()
{
    var win   = window.open( "https://y.byu.edu/ry/ae/prod/tem/blank.html", "FEEDBACK", "width=600,height=300,scrollbars=yes, resizable=yes" );
    win.location = "https://y.byu.edu/ry/ae/prod/user_help/cgi/feedback.cgi?app=" +
        escape('MyMAP: Academic Planning') +
        "&to=newprogressreportfeedback@byu.edu&cc= &bcc= ";
    win.focus();
}

function getAccessDelegationHelp()
{
    var url      = "https://y.byu.edu/ry/ae/prod/person/tem/accessDelegationHelp.tem"
    var win         = window.open( url, "PORTALHELP", "width=900,height=700,scrollbars=yes, resizable=yes" );
    win.focus();
}

function getHelp(helpwith)
{
    var action      = "https://y.byu.edu/ry/ae/prod/user_help/cgi/userhelp.cgi"
    var parms       = "?speed_url="+helpwith+"&ischild=yes";
    var url         = action + parms;
    var win         = window.open( url, "PORTALHELP", "width=700,height=300,scrollbars=yes, resizable=yes" );
    win.focus();
}

function selectWebPage( web_resource_id, url )
{
    byu.brownie.navigateTo(url);
}

function selectPerson(personId) {
    const event = new CustomEvent('newPersonId', {
        detail: {
            personId: personId
        }
    })
    document.dispatchEvent(event)
}

function findWebResource(product_id, thePattern) {
    var action = 'https://y.byu.edu/ry/ae/prod/navigation/cgi/webResourceXref.cgi';
    var pattern = thePattern;
    var url = action + '?target_pattern=' + escape(pattern) + '&product_id=' + product_id;
    var newWin = window.open( encodeURI(url),
        'Web_Resource_Search',
        'width=600,height=500,'
        + 'location=no,toolbars=yes,'
        + 'scrollbars=yes,status=yes,'
        + 'resizable=yes' );
    newWin.focus();
}
