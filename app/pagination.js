var el = document.getElementById("pagination");

var pagination = {
    currentPage: 1,
    pageLength: 10,
    totalRecords: 50,
    render: function () {
        this.totalRecords = todoService.getTodosCount();
        console.log(`Paging ${this.totalRecords}`);
        let pages = this.totalRecords / this.pageLength;
        this.pages = pages;
        let buttons = '';
        buttons += `
            <button class="pagination-btn prev" 
                type="button" 
                onclick="pagination.prev(this)">prev</button>
        `;

        for(let i = 1; i <= pages; i++) {
            buttons += this.getButton(i);
        }
        buttons += `
            <button class="pagination-btn next" 
                type="button" 
                onclick="pagination.next(this)">next</button>
        `;

        el.innerHTML = buttons;
    },
    getButton: function (text) {
        let classNames = 'pagination-btn';
        if (this.currentPage == text) {
            classNames += ' current-page';
        }
        let html = `
            <button id="btn-${text}" 
                class="${classNames}" type="button" onclick="pagination.gotoPage(this,${text})">${text}</button>
        `;
        return html;
    },
    prev: function (btn) {
        if (this.currentPage == 1) return;
        this.currentPage = this.currentPage - 1;
        let currentPageBtn = document.getElementById(`btn-${this.currentPage}`);
        //todo: fix as button is undefined sometime when add/remove elems
        if (!currentPageBtn) {
            return; // if no page, return
        } 
        this.gotoPage(currentPageBtn, this.currentPage);
    },

    next: function (btn) {
        if (this.currentPage > this.pages-1) return;
        this.currentPage = this.currentPage  + 1;
        let currentPageBtn = document.getElementById(`btn-${this.currentPage}`);
        if (!currentPageBtn) return;
        this.gotoPage(currentPageBtn, this.currentPage);
    },

    gotoPage: function (btn,pageNo) {
        console.log(btn);
        this.currentPage = pageNo;
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