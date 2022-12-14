import next from 'next'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-discord'
const app = express();
const nextApp = next({ dev: true })

const handle = nextApp.getRequestHandler();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookies: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: false
  }
}))

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})
app.use(passport.initialize())
app.use(passport.session())
passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile)
}))

app.get("/auth/callback", passport.authenticate("discord", {failureRedirect: '/'}), (req,res) => {
    res.send("Você está logado como "+req.user.username+", já pode <button onclick='window.close()'>fechar esta pagina.</button><script>window.close()</script>")
})
app.get("/login", passport.authenticate("discord", {}));

app.get("/api/users/v1/:id", (req, res) => {
    if(req.params.id !== "@me") return res.status(404).send("Not found");

    res.status(200).json(req.user);
})

nextApp.prepare().then(() => {
  
  app.get('*', handle);
  
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running.")
  })
  
});