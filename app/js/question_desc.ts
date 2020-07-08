/**
 * inserts the question type and the question description above the question
 * why is this not in the DB? who knows!
 * @param counter - question number
 */
function putDescription(counter: number) {

    for (let i = 1; i <= counter; i++) {
        let descriptionLabel = ".description_label_" + i
        let descriptionText = ".description_text_" + i
        let img = ".img_" + i

        if (i >= 4 && i <= 8) {
            if (i === 4) {
                document.querySelector(descriptionLabel).innerHTML = "Comparison Questions"
            }
            document.querySelector(descriptionText).innerHTML = "<p>Each   question   in   this   section   will   ask   you   to   make   a   comparison.   The   questions   will   compare   things   in<br>" +
                "the   format      \"A   is   to   B   as   C   is   to   _____\",   and   you   will   have   to   choose   which   option   best   fits   in   the   space.</p>"
        }
        if (i >= 9 && i <= 13) {
            if (i === 9) {
                document.querySelector(descriptionLabel).innerHTML = "Syntax Questions"
                document.querySelector(descriptionText).innerHTML = "<p>In   this   section,   you   will   be   given   a   set   of   language   characters   and   a   list   of   syntax   rules   for   the   set.   You   will also   be   given   a   correct   sample   series   for   the   language   set   for   comparison.   These   language   characters and   syntax   rules   are   completely   arbitrary,   and   you   should   not   seek   a   rational   explanation   -   just   follow them   as   they   are   given.<br>" +
                    "Check   each   series   of   characters   to   make   certain   that   all   of   the   syntax   rules   have   been   followed.   If   they have,   mark   the   question   series   correct.   If   they   have   not,   mark   the   question   series   incorrect.</p>"
            }
            document.querySelector(descriptionText).innerHTML += "These   questions   are   based   on   the   language   described   below.   For   your   convenience,   this   description   is repeated   in   each   of   these   questions.<br>" +
                "<p>Language   Small   set:   {a   b   c   ...   z}   Large   set:   {A   B   C   ...   Z}   Number   set:   {0   1   2   3   4   5   6   7   8   9} Syntax   Rules<br>" +
                "1.   A   series   can   have   up   to,   but   not   more   than,   8   characters.<br>" +
                "2.   A   series   cannot   begin   with   a   character   from   the   small   set.<br>" +
                "3.   A   series   cannot   end   with   a   character   from   the   large   set.<br>" +
                "4.   When   a   series   ends   with   a   character   from   the   number   set,   it   must   be   an   odd   number. Example   series:   Amber95   -   this   is   correct</p>"
        }

        if (i >= 14 && i <= 18) {
            if (i === 14) {
                document.querySelector(descriptionLabel).innerHTML = "Procedure   Section"
                document.querySelector(descriptionText).innerHTML = "<p>In   this   section   you   will   be   given   a   flow   chart   which   illustrates   a   simple   procedure.   Each   question   will   ask<br>" +
                    "you   to   determine   the   logical   sequence   of   steps   in   the   procedure</p>"
            }
            document.querySelector(descriptionText).innerHTML += "<p>These   questions   are   based   on   the   flow   chart   shown   below.   For   your   convenience,   this   flowchart   is repeated   in   each   of   these   questions   Flow   Chart   You   have   a   group   of   animals   that   you   need   to   sort   into lists   of   mammals,   birds,   fish,   amphibians,   and   reptiles.</p>"
            document.querySelector(img).innerHTML = "<img src='../app/images/graph.png'>"
        }
        if (i === 19) {
            document.querySelector(descriptionLabel).innerHTML = "Math/Logic   Section"
            document.querySelector(descriptionText).innerHTML = "<p>This   section   contains   questions   that   ask   you   to   use   logic   to   find   the   answer   to   a   problem.   Most   of   the problems   involve   maths,   but   none   of   the   maths   is   complex.   Read   the   question,   analyze   the   situation, and   choose   the   best   answer.</p>"
        }
        if (i === 24) {
            document.querySelector(descriptionLabel).innerHTML = "Sequence   Section"
            document.querySelector(descriptionText).innerHTML = "<p>The   questions   in   this   section   all   involve   finding   patterns   in   a   series   of   characters.   You   will   be   asked   to\n" +
                "choose   the   option   which   you   feel   best   continues   the   pattern.</p>"
        }
    }
}
