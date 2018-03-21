var el = document.getElementById("pagination");

var pagination = {
    currentPage: 0,
    pageLength: 10,
    totalRecords: 50,
    render: function () {
        this.totalRecords = todoService.getTodosCount();
        console.log(`Paging ${this.totalRecords}`);
        let pages = this.totalRecords / this.pageLength;
        let buttons = '';
        for(let i = 1; i <= pages; i++) {
            buttons += this.getButton(i);
        }
        el.innerHTML = buttons;
    },
    getButton: function (text) {
        let html = `
            <button class="pagination-btn" type="button" onclick="pagination.gotoPage(this,${text})">${text}</button>
        `;
        return html;
    },
    gotoPage: function (btn,pageNo) {
        console.log(btn);
        let paginationButtons = document.querySelectorAll(".pagination-btn");
        for (let i = 0; i < paginationButtons.length; i++) {
            paginationButtons[i].classList.remove("current-page");
        }
        btn.classList.add("current-page");

        let pagedData = todoService.getPagedData(pageNo, this.pageLength);
        console.log("page: ", pagedData);
        todoApp.render(pagedData);
    }
}

pagination.render();