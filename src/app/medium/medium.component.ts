import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';
import MediumEditor from 'medium-editor';
import { FirebaseStoreService } from '../services/firebase-store.service';
import { fromEvent, Subject, Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { MathjaxService } from '../services/mathjax.service';
@Component({
  selector: 'app-medium',
  templateUrl: './medium.component.html',
  styleUrls: ['./medium.component.scss']
})
export class MediumComponent implements OnInit, AfterViewInit {
  editor: any;
  insertSubject$: Subject<string> = new Subject();
  user: any;
  savedComment: string = null;
  mathJaxObject;
  ;
  @ViewChild('editable', {
    static: true
  }) editable: ElementRef;
  nElement: any;

  constructor(
    public auth: FirebaseAuthService,
    private router: Router,
    public fireAuth: AngularFireAuth,
    public fireStoreDBService: FirebaseStoreService,
    public mathService: MathjaxService
  ) { }

  ngOnInit() {
    this.mathjaxConfig()
    this.renderMathjax();
  }
  ngAfterViewInit() {
    this.nElement = this.editable.nativeElement;
    /**
     * Medium editor initialisation and settings
     */
    this.editor = new MediumEditor(this.nElement,
      {
        paste: {
          forcePlainText: true,
          cleanPastedHTML: false,
          cleanReplacements: [],
          cleanAttrs: ['class', 'style', 'dir'],
          cleanTags: ['meta'],
          unwrapTags: []
        },
        toolbar: {
          allowMultiParagraphSelection: true,
          buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          align: 'center',
          sticky: false,
          updateOnEmptySelection: false
        }
      });

    /**
     * 1. Get the current logged in user by ID
     * 2. Fetch the data from Firebase associated to the user
     * 3. Set the content for the medium editor with fetched data
     */
    this.fireAuth.authState.subscribe(authState => {
      if (authState) {
        this.user = authState;
        this.fireStoreDBService.getRecord(this.user.uid).subscribe(doc => {
          if (doc.data()) {
            this.savedComment = doc.data().body
            this.editor.resetContent();
            this.savedComment && this.editor.setContent(this.savedComment);
          }

        })
      }
    });
    /**
     * 1. Listen to keystrokes
     * 2. When a user pauses for two seconds, save the data in firebase using their userID
     */
    this.editor.subscribe('editableInput', (event, editable) => {
      this.insertSubject$.next(event.target.innerHTML);
    });
    this.insertSubject$.pipe(map((event: any) => {
      return event;
    }),
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(value => {
        this.renderMathjax()
        this.fireStoreDBService.saveRecord(this.user.uid, value)
      });
  }

  logout() {
    this.auth.firebaseGoogleLogout().then(
      (resp) => {
        this.router.navigate(['/login'])
      });;
  }

/**
 * Mathjax component
 *
 */
updateEquation(){
  this.mathJaxObject = this.mathService.getMediumWindow()['MathJax'];
}

renderMathjax() {
  this.updateEquation();
  let angObj = this;
  setTimeout(() => {
    angObj.mathJaxObject['Hub'].Queue(["Typeset", angObj.mathJaxObject.Hub], this.nElement);
  },1000)
}
mathjaxConfig() {
  this.updateEquation();
  this.mathJaxObject.Hub.Config({
    showMathMenu: false,
    tex2jax: { inlineMath: [["$", "$"]],displayMath:[["$$", "$$"]] },
    CommonHTML: { linebreaks: { automatic: true } },
    "HTML-CSS": { linebreaks: { automatic: true } },
    SVG: { linebreaks: { automatic: true } }
  });
}


}
