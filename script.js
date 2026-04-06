/* sample of APA style reference
journal
Chorpita, B. F., & Barlow, D. H. (2018). The Development of Anxiety: 
The Role of Control in the Early Environment. Routledge EBooks, 227–264.
https://doi.org/10.4324/9781315619996-2

Miller, K., & Massie, M. J. (2006). Depression and Anxiety. 
The Cancer Journal, 12(5), 388–397. 
https://journals.lww.com/journalppo/Abstract/2006/09000/Depression_and_Anxiety.8.aspx
In-text citation: (Miller & Massie, 2006)

sample of UKM STYLE citation
Andanastuti Muchtar, Lim, L.C. & Lee., K.H. 2002. Finite element analysis of
Vickers indentation cracking processes in brittle solids using elements
exhibiting cohesive post failure behaviour. Journal of Materials Science 38(2):
235-243.

Hamzah, N., Mohamed, A. & Hussain, A. 2004. A new approach to locate the voltage
sag source using real current component. Journal of Electric Power System
Research 72: 113-123.

Author’s name, followed by a full stop
Year, followed by a full stop
Title of article, followed by a full stop
Title of Journal must be italicized (First letter of each word in the title, except for
prepositions, should be capitalized)
Publication data (volume, series number, month or season)
Issue number (within brackets), followed by a colon - can skip for now
Number of pages of the article, followed by a full stop
*/

let listOfRef = [];

function Journal(id, authors, year, articleTitle, journalTitle, publicationData, numPages) {
	this.id = id;
	this.authors = authors;
	this.year = year;
	this.articleTitle = articleTitle;
	this.journalTitle = journalTitle;
	this.publicationData = publicationData;
	this.numPages = numPages;

	// idea: this is to return an html of the reference in the correct format
	this.display = function () {
		return (
			`${authors} ${year}. ${articleTitle}. ${journalTitle} ${publicationData}: ${numPages}.`
		)
	}
}

function addRefToList(authors, year, articleTitle, journalTitle, publicationData, numPages) {
	const newJournal = new Journal(crypto.randomUUID(), authors, year, articleTitle, journalTitle, publicationData, numPages);

	listOfRef.push(newJournal);
	console.log(listOfRef[0].display());
}

const submittedText = document.getElementById("input-apa-text");
let originalText = "";

submittedText.addEventListener('submit', (e) => {
	e.preventDefault();

	const data = new FormData(submittedText);
	originalText = data.get('apa-text');

	processInput();
})

function processInput() {
	const parts = originalText.match(/^(.*?)\s*\((\d{4})\)\.\s*(.*)$/);

	const authors = parts[1];
	const year = parts[2];
	const remaining = parts[3]
		.split(/[.]\s*/)
		.map(s => s.trim())
		.filter(s => s.length > 0);

	const articleTitle = remaining[0] || "";
	let journalInfo = remaining[1] || "";

	const segments = journalInfo.split(/[,]\s*/); 
	let journalTitle = segments[0];
	let publicationData = "";
	let numPages = "";

	segments.slice(1).forEach(part => {
		part = part.trim().replace(/\.$/, "");
		if (/^\d+\(\d+\)$/.test(part))
			publicationData = part;
		else if (/^\d+[\-–—]\d+$/.test(part))
			numPages = part;
	});

	addRefToList(authors, year, articleTitle, journalTitle, publicationData, numPages);
}